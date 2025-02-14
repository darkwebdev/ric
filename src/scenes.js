import { isBlocking } from './ui.js';
import { dialogsFromText, parseDialog } from './parse.js';

export function scenesFromText(text) {
    return scenesFromDialogs(dialogsFromText(text));
}

const ImageFns = [
    'Background',
    'Image',
    // 'Character',
];

export function scenesFromDialogs(dialogs) {
    const scenes = [];

    let currentScene = [];
    dialogs.forEach(({ content }) => {
        parseDialog(content).forEach(line => {
            currentScene.push(line);
            if (isBlocking(line.fn)) {
                scenes.push(currentScene);
                const prevScene = scenes[scenes.length - 1];
                const images = prevScene.filter(line => ImageFns.includes(line.fn));
                currentScene = [...images];
            }
        });
    });

    if (currentScene.length) {
        scenes.push(currentScene);
    }

    return scenes;
}
