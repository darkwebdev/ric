import { useEffect, useState } from 'react';
import { Link, useRoute, useSearchParams } from 'wouter';
import { DataSrcEn } from '../const.js';
import { scenesFromText } from '../scenes.js';
import { DialogScreen } from './DialogScreen/index.jsx';
import { useCountdown } from '../hooks/useCountdown.js';
import { backgroundSrc, charImageSrc, imageSrc, preloadImages } from '../fetch.js';

export const Story = () => {
    const [match, params] = useRoute("/story/*");
    const [searchParams, setSearchParams] = useSearchParams();
    const [scenes, setScenes] = useState();
    const [delay, setDelay] = useState();
    const delayCountdown = useCountdown({ countStart: delay, interval: 10 });
    const sceneIndex = parseInt(searchParams.get('scene')) || 0;

    useEffect(() => {
        console.log('Story useEffect');
        if (match) {
            (async () => {
                const { 0: path } = params;
                console.log('Loading story...');
                const text = await storyLoader(path);
                console.log('Story loaded:', text);
                if (text) {
                    const allScenes = scenesFromText(text);
                    console.log('Scenes:', allScenes);
                    setScenes(allScenes);
                    const allLinks = allScenes.flatMap(scene => scene.flatMap(line => {
                        switch (line.fn) {
                            case 'Character':
                                return line.name && [charImageSrc(line.name), line.name2 && charImageSrc(line.name2)];
                            case 'Image':
                                return line.image && imageSrc(line.image);
                            case 'Background':
                                return line.image && backgroundSrc(line.image);
                        }
                    })).filter(Boolean);
                    const uniqLinks = Array.from(new Set(allLinks));
                    console.log('Preloading images...', uniqLinks);
                    await preloadImages(uniqLinks);
                    console.log('Images preloaded.');
                }
            })();
        }
    }, []);

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
        setSearchParams({ scene: Math.min(scenes.length - 1, sceneIndex + 1) });
    }

    const gotoPrevScene = () => {
        setSearchParams({ scene: Math.max(0, sceneIndex - 1) });
    }

    console.log('Story RENDER', match, params);

    return scenes && <>
        <DialogScreen
            onClick={gotoNextScene}
            onDelay={setDelay}
            scene={scenes[sceneIndex]}
        />

        <section className="dialog-buttons">
            <Link to="/" className="dialog-button">Return</Link>
            <button className="dialog-button" onClick={gotoPrevScene}>Previous</button>
        </section>

        <div className="dialog-debug">
            <div className="dialog-debug-delay">Delay: {delayCountdown ? <span>{delayCountdown}ms</span> : 'None'}</div>
            <ol className="dialog-timeline" start="0">
                {scenes.map((scene, si) =>
                    <li key={si} className={`dialog-timeline-scene${si === sceneIndex ? ' active' : ''}`}>
                        {scene.map((line, li) =>
                            <Link to={`?scene=${si}`} key={`${si}-${line.fn}-${li}`}>
                                {debugLine(line)}
                            </Link>
                        )}
                    </li>
                )}
            </ol>
        </div>
    </>;
}

async function storyLoader(path) {
    console.log('Loading story text...', path);
    const res = await fetch(`${DataSrcEn}/gamedata/story/${path}.txt`);
    console.log('Story text loaded.');

    return res.ok ? res.text() : null;
}

function debugLine(line) {
    switch (line.fn) {
        case 'Blocker':
            return `Blocker: ${line.fadetime}s`;
        case 'Text':
            return `Text: [${line.name}] ${line.text.slice(0, 20)}`;
        case 'delay':
        case 'Delay':
            return `Delay: ${line.time}s`;
        case 'Character':
            return `Character: ${line.name || ''}${line.name2 ? `, ${line.name2}` : ''}`;
        case 'Image':
            return `Image: ${line.image}`;
        case 'Background':
            return `Background: ${line.image}`;
        default:
            return `${line.fn}: ignore`;
    }
}
