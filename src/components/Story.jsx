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
    const { src, load, stop, fade, isLoading, isPlaying, togglePlayPause, volume: playerVolume, setVolume: setPlayerVolume } = useAudioPlayerContext();
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
    const storyTag = storyOp?.avgTag?.replace(' Operation', '');
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
        const currentScene = scenes?.[sceneIndex] || [];
        const playMusicLine = currentScene.find(line => line.fn.toLowerCase() === 'playmusic');
        const stopMusicLine = currentScene.find(line => line.fn.toLowerCase() === 'stopmusic');
        const setMusicVolumeLine = currentScene.find(line => line.fn.toLowerCase() === 'musicvolume');

        console.log('useEffect: play music', playMusicLine);
        if (playMusicLine) {
            const { intro, key, volume=1, crossfade } = playMusicLine;
            console.log('Playing music for scene', sceneIndex, intro, key, storyData?.storyVariables);
            const introPath = storyData?.storyVariables[intro?.replace('$', '')];
            const keyPath = storyData?.storyVariables[key?.replace('$', '')];
            const keyOptions = {
                autoplay: true,
                loop: true,
                onplay: () => {
                    console.log('Key playing:', keyPath, volume);
                    setPlayerVolume(volume);
                },
            };
            if (introPath) {
                console.log('Loading intro', introPath, playerVolume);
                load(musicSrc(introPath), {
                    autoplay: true,
                    onplay: () => {
                        console.log('Intro playing:', introPath, volume);
                        setPlayerVolume(volume);
                    },
                    onend: () => {
                        console.log('Intro ended:', introPath);
                        if (keyPath) {
                            console.log('Loading key', keyPath, playerVolume);
                            load(musicSrc(keyPath), keyOptions);
                        }
                    }
                });
            } else if (keyPath) {
                console.log('Loading key', keyPath, playerVolume);
                load(musicSrc(keyPath), keyOptions);
            }
        } else if (stopMusicLine) {
            const { fadetime=0 } = stopMusicLine;
            console.log('Stopping music with fade', fadetime);
            fade(playerVolume, 0, fadetime*1000);
            setTimeout(() => {
                console.log('Stop music.');
                stop();
            }, fadetime*1000);
        } else if (setMusicVolumeLine) {
            const { volume = playerVolume, fadetime = 0 } = setMusicVolumeLine;
            console.log('Setting music volume', volume, fadetime);
            fade(playerVolume, volume, fadetime*1000);
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
            <button className="dialog-button" onClick={() => {togglePlayPause(); console.log('Unmuting', src)}}>{isPlaying ? 'Mute' : isLoading ? '...' : 'Unmute'}</button>
            <button className="dialog-button" onClick={() => setPlayerVolume(1)}>{`Vol: ${playerVolume}`}</button>
            <button className="dialog-button" onClick={clearCache}>Clear cache</button>
            {isDebug && <button className="dialog-button" onClick={() => setCancelDelay(true)}>Pause delay</button>}
        </section>
    </>;
}
