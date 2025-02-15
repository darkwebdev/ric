import { isBlocking } from './ui.js';
import { dialogsFromText, parseDialog } from './parse.js';

export function scenesFromText(text) {
    return scenesFromDialogs(dialogsFromText(text));
}

const ImageFns = [
    'Background',
    'Image',
    'Character',
];

export function scenesFromDialogs(dialogs) {
    const scenes = [];

    let currentScene = [];
    dialogs.forEach(({ content }) => {
        parseDialog(content).forEach(line => {
            addLineToScene(currentScene, line);
            if (isBlocking(line.fn)) {
                scenes.push(currentScene);
                const images = currentScene.filter(line => ImageFns.includes(line.fn));
                currentScene = [...images];
            }
        });
    });

    if (currentScene.length) {
        scenes.push(currentScene);
    }

    return scenes;
}

function addLineToScene(scene, line) {
    const isImageLine = ImageFns.includes(line.fn);

    if (isImageLine) {
        const imageLineIndex = scene.findIndex(l => l.fn === line.fn);
        if (imageLineIndex >= 0) {
            scene[imageLineIndex] = line;
            return;
        }
    }

    scene.push(line);
}
