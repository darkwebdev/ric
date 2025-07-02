import { useEffect, useState } from 'react';
import { Link, useLocation, useRoute, useSearchParams } from 'wouter';
import { useAudioPlayerContext } from 'react-use-audio-player';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCountdown } from '../hooks/useCountdown.js';
import { scenesFromText } from '../scenes.js';
import { storyLoader } from '../network.js';
import { storyByPath } from '../data-utils';
import { StorySlider } from './StorySlider';
import { musicSrc } from '../asset-sources';

export const Story = () => {
    const [match, params] = useRoute("*/story/*");
    const [searchParams, setSearchParams] = useSearchParams();
    const [location, setLocation] = useLocation();
    const [storyData, setStoryData] = useLocalStorage('storyData');
    const { load, isMuted, toggleMute, stop } = useAudioPlayerContext();
    const [scenes, setScenes] = useState();
    const [delay, setDelay] = useState();
    const [cancelDelay, setCancelDelay] = useState();
    const delayCountdown = useCountdown({ countStart: delay, interval: 100 });
    const sceneIndex = parseInt(searchParams.get('scene')) || 0;
    const isDebug = searchParams.get('debug') !== null;

    const { 1: path } = params || [];
    const story = storyData && storyByPath(storyData, path);
    const storyId = story?.id;
    const storyName = story?.name;
    const datas = story?.infoUnlockDatas;
    const storyOp = datas?.find(op => op.storyTxt === path) || datas?.[0];
    const storyTag = storyOp.avgTag.replace(' Operation', '');
    const index = datas?.findIndex(op => op.storyTxt === path);
    const nextOp = index >= 0 ? datas[index + 1] : undefined

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

    useEffect(() => {
        const musicLine = scenes?.[sceneIndex]?.find(line => line.fn === 'PlayMusic')
        if (musicLine) {
            const { intro, key, volume=1, crossfade } = musicLine;
            console.log('Playing music for scene', sceneIndex, intro, key, storyData?.storyVariables);
            const introPath = storyData?.storyVariables[intro.replace('$', '')];
            if (introPath) {
                console.log('Playing music', introPath);
                load(musicSrc(introPath), {
                    autoplay: true,
                    onend: () => {
                        const keyPath = storyData?.storyVariables[key.replace('$', '')];
                        if (keyPath) {
                            console.log('Playing music', keyPath);
                            load(musicSrc(keyPath), {
                                autoplay: true,
                                loop: true,
                            });
                        }
                    }
                });
            }
        } else if (scenes?.[sceneIndex]?.some(line => line.fn === 'stopmusic')) {
            stop();
        }
    }, [scenes, sceneIndex, storyData])

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

    const clearCache = () => {
        console.log('Clearing story cache');
        setStoryData(undefined);
        setLocation('/ric/');
    }

    return scenes && <>
        <h1 className="story-title">
            {storyName}
            {storyOp && <span className="story-op-title">{storyOp.storyName}{storyTag ? `: ${storyTag}` : ''}</span>}
        </h1>

        <StorySlider
            scenes={scenes}
            storyVariables={storyData?.storyVariables}
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
            <button className="dialog-button" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
            <button className="dialog-button" onClick={clearCache}>Clear cache</button>
            {isDebug && <button className="dialog-button" onClick={() => setCancelDelay(true)}>Pause delay</button>}
        </section>
    </>;
}
