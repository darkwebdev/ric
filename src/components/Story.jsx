import { useEffect, useState } from 'react';
import { Link, useRoute, useSearchParams, useLocation } from 'wouter';
import { scenesFromText } from '../scenes.js';
import { storyLoader } from '../network.js';
import { useCountdown } from '../hooks/useCountdown.js';
import { StorySlider } from './StorySlider';
import { nextOperationByPath, operationByPath, storyNameById } from '../data-utils';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Story = () => {
    const [match, params] = useRoute("*/story/*");
    const [searchParams, setSearchParams] = useSearchParams();
    const [location, setLocation] = useLocation();
    const [storyData] = useLocalStorage('storyData');
    const [scenes, setScenes] = useState();
    const [delay, setDelay] = useState();
    const [cancelDelay, setCancelDelay] = useState();
    const delayCountdown = useCountdown({ countStart: delay, interval: 100 });
    const sceneIndex = parseInt(searchParams.get('scene')) || 0;
    const isDebug = searchParams.get('debug') !== null;

    const { 1: path } = params || [];
    const { 1: storyId } = path.split('/') || [];
    const storyName = storyData && storyNameById(storyData, storyId);
    const storyOp = storyData && operationByPath(storyData, storyId, path);
    const nextOp = storyData && nextOperationByPath(storyData, storyId, path);

    useEffect(() => {
        if (storyId) {
            (async () => {
                console.log('Story loaded', storyName, storyOp?.storyName, path);
                const text = await storyLoader(path);
                if (text) {
                    setScenes(scenesFromText(text));
                }
            })();
        }
    }, [storyOp]);

    useEffect(() => {
        const sceneDelay = scenes?.[sceneIndex]?.reduce((result, line) => ({
            Delay: line.time * 1000,
            Blocker: line.fadetime * 1000,
        }[line.fn]) || result, undefined);

        isDebug && console.log(`DELAY: ${sceneDelay} sceneIndex: ${sceneIndex}`);

        if (!cancelDelay && sceneDelay) {
            const timeout = setTimeout(() => {
                setDelay(undefined);
                gotoNextScene();
            }, sceneDelay);

            setDelay(sceneDelay);

            return () => {
                clearTimeout(timeout);
                setDelay(undefined);
            }
        }
    }, [scenes, sceneIndex, cancelDelay]);

    const gotoNextScene = e => {
        isDebug && console.log(`gotoNextScene: ${sceneIndex} -> ${sceneIndex + 1}`, e);
        gotoScene(Math.min(scenes.length - 1, sceneIndex + 1));
    }

    const gotoNext10Scene = e => {
        isDebug && console.log(`gotoNext10Scene: ${sceneIndex} -> ${sceneIndex + 1}`, e);
        gotoScene(Math.min(scenes.length - 1, sceneIndex + 10));
    }

    const gotoPrevScene = () => {
        gotoScene(Math.max(0, sceneIndex - 1));
    }

    const gotoScene = sceneIndex => {
        isDebug && console.log(`gotoScene: ${sceneIndex}`);
        setSearchParams({ scene: sceneIndex, ...(isDebug ? { debug: '' } : {}) });
    }

    const gotoNextOp = () => {
        isDebug && console.log(`gotoNextOp`);
        setLocation(`/ric/story/${nextOp.storyTxt}${isDebug ? '?debug' : ''}`);
    }

    return scenes && <>
        <h1 className="story-title">
            {storyName}
            {storyOp && <span className="story-op-title">{storyOp.storyName}</span>}
        </h1>

        <StorySlider
            scenes={scenes}
            sceneIndex={sceneIndex}
            delayCountdown={delayCountdown}
            onClick={gotoNextScene}
            onChange={gotoScene}
            isDebug={isDebug}
        />

        <section className="dialog-buttons">
            <Link to="/ric/" className="dialog-button">Return</Link>
            <button className="dialog-button" onClick={gotoPrevScene}>Previous</button>
            <button className="dialog-button" onClick={gotoNext10Scene}>+10</button>
            <button className="dialog-button" onClick={gotoNextOp}>Next Operation</button>
            {isDebug && <button className="dialog-button" onClick={() => setCancelDelay(true)}>Pause delay</button>}
        </section>
    </>;
}
