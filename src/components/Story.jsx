import { useEffect, useState } from 'react';
import { Link, useRoute, useSearchParams } from 'wouter';
import { scenesFromText } from '../scenes.js';
import { storyLoader } from '../network.js';
import { useCountdown } from '../hooks/useCountdown.js';
import { StorySlider } from './StorySlider';

export const Story = () => {
    const [match, params] = useRoute("/story/*");
    const [searchParams, setSearchParams] = useSearchParams();
    const [scenes, setScenes] = useState();
    const [delay, setDelay] = useState();
    const [cancelDelay, setCancelDelay] = useState();
    const delayCountdown = useCountdown({ countStart: delay, interval: 100 });
    const sceneIndex = parseInt(searchParams.get('scene')) || 0;
    const isDebug = searchParams.get('debug');

    useEffect(() => {
        if (match) {
            (async () => {
                const { 0: path } = params;
                const text = await storyLoader(path);
                if (text) {
                    setScenes(scenesFromText(text));
                }
            })();
        }
    }, []);

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

    const gotoPrevScene = () => {
        gotoScene(Math.max(0, sceneIndex - 1));
    }

    const gotoScene = sceneIndex => {
        isDebug && console.log(`gotoScene: ${sceneIndex}`);
        setSearchParams({ scene: sceneIndex, isDebug });
    }

    return scenes && <>
        <StorySlider
            scenes={scenes}
            sceneIndex={sceneIndex}
            delayCountdown={delayCountdown}
            onClick={gotoNextScene}
            onChange={gotoScene}
            isDebug={isDebug}
        />

        <section className="dialog-buttons">
            <Link to="/" className="dialog-button">Return</Link>
            <button className="dialog-button" onClick={gotoPrevScene}>Previous</button>
            {isDebug && <button className="dialog-button" onClick={() => setCancelDelay(true)}>Pause delay</button>}
        </section>
    </>;
}
