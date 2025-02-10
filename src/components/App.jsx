import React, { useEffect, useState } from 'react';
import { loadStoryData, loadStoryText } from '../fetch.js';
import { scenesFromText } from '../scenes.js';
import { Menu } from './Menu.jsx';
import { Header } from './Header.jsx';
import { DialogScreen } from './DialogScreen/index.jsx';
import { useCountdown } from '../hooks/useCountdown.js';

export const App = () => {
    const [storyData, setStoryData] = useState();
    const [scenes, setScenes] = useState();
    const [sceneIndex, setSceneIndex] = useState();
    const [delay, setDelay] = useState();
    const delayCountdown = useCountdown({ countStart: delay, interval: 10 });

    useEffect(() => {
        (async () => setStoryData(await loadStoryData()))()
    }, []);

    async function fetchStoryText(operation) {
        const text = await loadStoryText(operation.storyTxt);
        if (text) {
            console.log('Text dialog', text);
            const allScenes = scenesFromText(text);
            console.log('Scenes:', allScenes);
            setScenes(allScenes);
            setSceneIndex(0);
        }
    }

    useEffect(() => {
        console.log('useEffect delay', delay);
        if (delay) {
            const timeout = setTimeout(() => {
                console.log('delayed gotoNextScene');
                setDelay(undefined);
                gotoNextScene();
            }, delay);
            return () => {
                clearTimeout(timeout);
                setDelay(undefined);
            }
        }
    }, [delay]);

    const gotoNextScene = e => {
        console.log(`gotoNextScene: ${sceneIndex} -> ${sceneIndex + 1}`, e);
        setSceneIndex(sceneIndex + 1);
    }
    const gotoPrevScene = () => {
        setSceneIndex(Math.max(0, sceneIndex - 1));
    }
    const gotoScene = index => {
        console.log(`gotoScene: ${sceneIndex} -> ${index}`);
        setSceneIndex(index);
        setDelay(undefined);
    }

    const gotoMenu = () => {
        setScenes(undefined);
        setSceneIndex(undefined);
    }

    console.log('RENDER sceneIndex', sceneIndex);

    return <>
        <Header />

        {storyData &&
            <Menu storyData={storyData} onOperationSelect={fetchStoryText} />
        }

        {sceneIndex !== undefined && <>
            <DialogScreen
                onClick={gotoNextScene}
                onDelay={setDelay}
                scene={scenes[sceneIndex]}
            />

            <section className="dialog-buttons">
                <button className="dialog-button" onClick={gotoMenu}>Return</button>
                <button className="dialog-button" onClick={gotoPrevScene}>Previous</button>
            </section>

            <div className="dialog-debug">
                <div className="dialog-debug-delay">Delay: {delayCountdown ? <span>{delayCountdown}ms</span> : 'None'}</div>
                <ol className="dialog-timeline" start="0">
                    {scenes.map((scene, si) =>
                        <li key={si} className={`dialog-timeline-scene${si === sceneIndex ? ' active' : ''}`}>
                            {scene.map((line, li) =>
                                <button onClick={() => gotoScene(si)} key={`${si}-${line.fn}-${li}`}>
                                    {line.fn}{line.text && `: ${line.text.slice(0, 20)}`}
                                </button>
                            )}
                        </li>
                    )}
                </ol>
            </div>
        </>}
    </>;
}
