#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.resolve(__dirname, '..');
// Serve these files statically by placing them under public
const outDir = path.join(root, 'public', 'data', 'remote');

const DataSrcCn = 'https://raw.githubusercontent.com/ArknightsAssets/ArknightsGameData/master/cn';
const DataSrcEn = 'https://raw.githubusercontent.com/ArknightsAssets/ArknightsGamedata/master/en';

const ignoredStories = new Set([
  'activities/act13mini', // 'It's Been A While' collab, removed from stories
]);

const urls = [
  // Prefetch core story metadata and tables
  { src: `${DataSrcEn}/gamedata/excel/uniequip_table.json`, dest: 'en_US/gamedata/excel/uniequip_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_table.json`, dest: 'en_US/gamedata/excel/story_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_meta_table.json`, dest: 'en_US/gamedata/excel/story_review_meta_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_table.json`, dest: 'en_US/gamedata/excel/story_review_table.json' },
  { src: `${DataSrcEn}/gamedata/story/story_variables.json`, dest: 'en_US/gamedata/story/story_variables.json' },
  { src: `${DataSrcEn}/gamedata/excel/uniequip_table.json`, dest: 'en_US/gamedata/excel/uniequip_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_table.json`, dest: 'en_US/gamedata/excel/story_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_meta_table.json`, dest: 'en_US/gamedata/excel/story_review_meta_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_table.json`, dest: 'en_US/gamedata/excel/story_review_table.json' },
  { src: `${DataSrcEn}/gamedata/story/story_variables.json`, dest: 'en_US/gamedata/story/story_variables.json' },
  { src: `${DataSrcEn}/gamedata/excel/skin_table.json`, dest: 'en_US/gamedata/excel/skin_table.json' },
  { src: `${DataSrcCn}/gamedata/excel/skin_table.json`, dest: 'zh_CN/gamedata/excel/skin_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/charword_table.json`, dest: 'en_US/gamedata/excel/charword_table.json' },
  { src: `${DataSrcCn}/gamedata/excel/character_table.json`, dest: 'zh_CN/gamedata/excel/character_table.json' },
];

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200) return reject(new Error('Bad status ' + res.statusCode + ' for ' + url));
      mkdirp(path.dirname(dest));
      const file = fs.createWriteStream(dest);
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      
      res.on('end', () => {
        const newContent = Buffer.concat(chunks).toString('utf8');
        let existingContent = '';
        let hasChanged = true;
        try {
          if (fs.existsSync(dest)) {
            existingContent = fs.readFileSync(dest, 'utf8');
            hasChanged = newContent !== existingContent;
          }
        } catch (e) {
          // If we can't read existing file, assume it changed
          hasChanged = true;
        }
        
        // Write the new content
        fs.writeFileSync(dest, newContent);
        resolve(hasChanged);
      });
      
      res.on('error', reject);
      file.on('error', reject);
    });
    req.on('error', reject);
  });
}

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

(async function main() {
  try {
    console.log('Fetching metadata to', outDir);
    
    // Download all JSON files and track changes
    let hasChanges = false;
    for (const { src, dest } of urls) {
      const dst = path.join(outDir, dest);
      console.log('Downloading', src);
      try {
        const changed = await download(src, dst);
        if (changed) {
          hasChanges = true;
        }
      } catch (e) {
        console.warn('Failed to download', dest, e.message);
        // If download failed, assume it changed for safety
        hasChanges = true;
      }
    }
    
    // Create/update version file only if there were changes
    if (hasChanges) {
      const versionData = { 
        version: Date.now(),
        timestamp: new Date().toISOString(),
        description: 'Arknights story data version'
      };
      const versionPath = path.join(outDir, 'version.json');
      mkdirp(path.dirname(versionPath));
      fs.writeFileSync(versionPath, JSON.stringify(versionData, null, 2));
      console.log('Updated version file due to detected changes');
    } else {
      console.log('No changes detected in JSON files, skipping version update');
    }

    // Download story .txt files based on story_review_table.json
    const storyReviewPath = path.join(outDir, 'en_US/gamedata/excel/story_review_table.json');
    if (fs.existsSync(storyReviewPath)) {
      const storyReview = JSON.parse(fs.readFileSync(storyReviewPath, 'utf8'));
      const storyTxts = new Set();
      for (const act of Object.values(storyReview)) {
        if (act.infoUnlockDatas) {
          for (const unlock of act.infoUnlockDatas) {
            if (unlock.storyTxt && (unlock.storyTxt.startsWith('activities/') || unlock.storyTxt.startsWith('obt/'))) {
              storyTxts.add(unlock.storyTxt);
            }
          }
        }
      }
      const stories = Array.from(storyTxts);
      let downloadCount = 0;
      for (const story of stories) {
        if (downloadCount >= 100) break; // limit to 100 downloads
        if (Array.from(ignoredStories).some(ignored => story.startsWith(ignored))) {
          console.log('Skipping ignored story', story);
          continue;
        }
        const src = `${DataSrcEn}/gamedata/story/${story}.txt`;
        const dst = path.join(outDir, 'en_US/gamedata/story', `${story}.txt`);
        if (fs.existsSync(dst)) {
          // console.log('Story already exists, skipping', story);
          continue;
        }
        try {
          console.log('Downloading story', story);
          await download(src, dst);
          downloadCount++;
        } catch (e) {
          console.warn('Failed to download story', story, e.message);
        }
      }
      console.log(`${downloadCount} stories downloaded.`);
    }

    console.log('Finished fetching remote data.')
    process.exit(0);
  } catch (e) {
    console.error('Failed', e);
    process.exit(1);
  }
})();
