const fs = require('fs');
const path = require('path');

const inputDir = process.argv[2];
const outputFile = 'data/reading-time.json';

if (!inputDir) {
    console.error('Usage: node reading-time.js <inputDir>');
    process.exit(1);
}

const storySizes = storySizesFromFiles(inputDir);
const levelSummaries = summarizeLevels(storySizes);
const resultWithSummaries = {
    ...storySizes,
    ...levelSummaries
};

fs.writeFileSync(outputFile, JSON.stringify(resultWithSummaries, null, 2));
console.log(`Reading times written to ${outputFile}`);
console.log(`Added ${Object.keys(levelSummaries).length} level summaries`);


function storySizesFromFiles(dir) {
    return fs.readdirSync(dir).reduce((result, file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            return {
                ...result,
                ...storySizesFromFiles(filePath)
            };
        }
        if (stat.isFile() && file.endsWith('.txt')) {
            const storyFile = file.replace('.txt', '');
            if (storyFile.startsWith('level') || storyFile.startsWith('story')) {
                const text = fs.readFileSync(filePath, 'utf8');
                const { words, minutes, textTime, durationTime } = calculateStoryReadingTime(text);
                console.log(`Processing ${filePath}`);
                console.log(`Estimated reading time: ${words} words, ${minutes} minutes (${textTime} text + ${durationTime} timing)\n`);
                return {
                    ...result,
                    [storyFile]: { words, minutes, }
                };
            }
        }
        return result;
    }, {});
}

function summarizeLevels(result) {
    return Object.entries(result).reduce((summaries, [fileName, { words, minutes }]) => {
        const match = fileName.match(/^((level_main_\d+)|(level_act\d+[a-z]*\d*)|(level_[^_]+))/);
        if (match) {
            const storyPrefix = match[1];
            return {
                ...summaries,
                [storyPrefix]: {
                    words: (summaries[storyPrefix]?.words || 0) + words,
                    minutes: (summaries[storyPrefix]?.minutes || 0) + minutes,
                },
            };
        }
        return summaries;
    }, {});
}

function quotesAndTransitionsFromText(lines) {
    let textQuotes = [];
    let totalDurationSeconds = 0;

    for (const line of lines) {
        const nameMatch = line.match(/^\[name="([^"]+)"](.+)$/);
        if (nameMatch) {
            const dialogue = nameMatch[2].trim();
            if (dialogue) {
                textQuotes.push(dialogue);
            }
            continue;
        }

        // Extract text from [Subtitle] scenes
        const subtitleMatch = line.match(/^\[Subtitle\(text="([^"]+)"[^\]]*\)\]$/);
        if (subtitleMatch) {
            const subtitleText = subtitleMatch[1];
            textQuotes.push(subtitleText);
            continue;
        }

        // Extract text from [Sticker] scenes
        const stickerMatch = line.match(/^\[Sticker\([^)]*text="([^"]+)"[^\]]*\)\]$/);
        if (stickerMatch) {
            let stickerText = stickerMatch[1];
            // Clean up HTML tags and escape sequences
            stickerText = stickerText.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags
            stickerText = stickerText.replace(/\\n/g, ' '); // Replace \n with space
            stickerText = stickerText.trim();
            if (stickerText) {
                textQuotes.push(stickerText);
            }
            continue;
        }

        // Extract text from [Decision] scenes (first option only)
        const decisionMatch = line.match(/^\[Decision\(options="([^"]+)"[^\]]*\)\]$/);
        if (decisionMatch) {
            const options = decisionMatch[1];
            const firstOption = options.split(';')[0];
            if (firstOption && firstOption.trim()) {
                textQuotes.push(firstOption.trim());
            }
            continue;
        }

        // Check for plain text (not starting with [ and not empty)
        if (!line.startsWith('[') && line.length > 0) {
            textQuotes.push(line);
            continue;
        }

        // Extract duration times from various commands
        // [Delay(time=X)] - explicit delays
        const delayMatch = line.match(/\[Delay\(time=([0-9.]+)\)\]/);
        if (delayMatch) {
            totalDurationSeconds += parseFloat(delayMatch[1]);
            continue;
        }

        // fadetime= parameters in various commands
        const fadetimeMatches = line.matchAll(/fadetime=([0-9.]+)/g);
        for (const match of fadetimeMatches) {
            totalDurationSeconds += parseFloat(match[1]);
        }

        // duration= parameters (including stickers and other commands)
        const durationMatches = line.matchAll(/duration=([0-9.]+)/g);
        for (const match of durationMatches) {
            totalDurationSeconds += parseFloat(match[1]);
        }

        // delay= parameters (common in stickers and subtitles)
        const delayMatches = line.matchAll(/delay=([0-9.]+)/g);
        for (const match of delayMatches) {
            // Only add small delays (usually text display timing), ignore very small ones (0.001, 0.04)
            const delayTime = parseFloat(match[1]);
            if (delayTime >= 0.1) {
                totalDurationSeconds += delayTime;
            }
        }

        // time= parameters in lowercase delay commands
        const timeMatch = line.match(/\[delay\(time=([0-9.]+)\)\]/i);
        if (timeMatch) {
            totalDurationSeconds += parseFloat(timeMatch[1]);
        }

        // Block timing for character actions and transitions
        const blockMatch = line.match(/block=true/);
        if (blockMatch) {
            totalDurationSeconds += 0.5;
        }
    }
    return { textQuotes, totalDurationSeconds };
}

function calculateStoryReadingTime(text, wordsPerMinute = 200) {
    const MinMinutes = 1;

    const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    let { textQuotes, totalDurationSeconds } = quotesAndTransitionsFromText(lines);
    const words = textQuotes
        .join(' ')
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0)
        .length;
    const textReadingMinutes = Math.ceil(words / wordsPerMinute);
    const durationMinutes = Math.ceil(totalDurationSeconds / 60);
    const totalMinutes = textReadingMinutes + durationMinutes;

    return {
        words,
        textTime: textReadingMinutes,
        durationTime: durationMinutes,
        minutes: Math.max(totalMinutes, MinMinutes)
    };
}
