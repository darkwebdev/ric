import { isBlocking } from './ui.js';
import { parseDialog } from './parse.js';

export function scenesFromDialogs(dialogs) {
    const scenes = [];
    let currentScene = [];

    dialogs.forEach(({ content }) => {
        parseDialog(content).forEach(line => {
            currentScene.push(line);
            if (isBlocking(line.fn)) {
                scenes.push(currentScene);
                currentScene = [];
            }
        });
    });

    if (currentScene.length) {
        scenes.push(currentScene);
    }

    return scenes;
}
