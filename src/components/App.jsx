import React, { useEffect, useState } from 'react';
import { dialogsFromText } from '../parse.js';
import { loadStoryData, loadStoryText } from '../fetch.js';
import { scenesFromDialogs } from '../scenes.js';
import { DialogLine } from './DialogLine.jsx';
import { Menu } from './Menu.jsx';
import { Header } from './Header.jsx';

export const App = () => {
    const [storyData, setStoryData] = useState();
    const [scenes, setScenes] = useState();
    const [sceneIndex, setSceneIndex] = useState();

    useEffect(() => {
        (async () => setStoryData(await loadStoryData()))()
    }, []);

    async function fetchStoryText(operation) {
        const text = await loadStoryText(operation.storyTxt);
        if (text) {
            console.log('Text dialog', text);
            const allScenes = scenesFromDialogs(dialogsFromText(text));
            console.log('Scenes:', allScenes);
            setScenes(allScenes);
            setSceneIndex(0);
        }
    }

    const gotoNextScene = () => {
        setSceneIndex(sceneIndex + 1);
    }
    const gotoPrevScene = () => {
        setSceneIndex(Math.max(0, sceneIndex - 1));
    }

    const hideDialog = () => {
        setScenes(undefined);
        setSceneIndex(undefined);
    }

    return <>
        <Header />

        {storyData &&
            <Menu storyData={storyData} onOperationSelect={fetchStoryText} />
        }

        {sceneIndex !== undefined &&
            <div className="dialog-screen" onClick={gotoNextScene}>
                <button onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    hideDialog();
                }}>Return
                </button>
                <button onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    gotoPrevScene();
                }}>Previous
                </button>
                {scenes[sceneIndex].map(line =>
                    <DialogLine line={line}/>
                )}
            </div>
        }
    </>;
}
