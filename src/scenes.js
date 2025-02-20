import { isBlocking } from './ui.js';
import { dialogsFromText, parseDialog } from './parse.js';

export function scenesFromText(text) {
    const scenes = scenesFromDialogs(dialogsFromText(text));
    console.log('Scenes:', scenes);
    return scenes;
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
        const imageIndex = scene.findIndex(l => l.fn === line.fn);
        if (imageIndex >= 0) {
            // if not enough args remove image from scene
            switch (line.fn) {
                case 'Background':
                case 'Image':
                    if (!line.image) {
                        scene.splice(imageIndex, 1);
                    }
                    return;
                case 'Character':
                    if (!line.name) {
                        scene.splice(imageIndex, 1);
                        return;
                    }
            }
            // replace image with new one
            scene[imageIndex] = line;
            return;
        }
    }

    scene.push(line);
}
