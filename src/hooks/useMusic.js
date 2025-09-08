import { useEffect } from 'react';
import { useAudioPlayerContext } from 'react-use-audio-player';
import { useWindowFocus } from './useWindowFocus';
import { useLocalStorage } from './useLocalStorage';
import { DefaultMusicVolume } from '../const';
import { musicSrc } from '../asset-sources';

export const useMusic = ({ scene=[], storyData }) => {
    const windowFocused = useWindowFocus();
    const { src, load, stop, fade, isLoading, isPlaying, togglePlayPause, volume: playerVolume, setVolume: setPlayerVolume } = useAudioPlayerContext();
    const [musicPlayerSettings, saveMusicPlayerSettings] = useLocalStorage('musicPlayer', {});

    useEffect(() => {
        if (!windowFocused && isPlaying) {
            console.log('Window lost focus, muting music...');
            saveMusicPlayerSettings({
                ...musicPlayerSettings,
                volume: playerVolume,
                mute: true
            });
            togglePlayPause();
        } else if (windowFocused && !musicPlayerSettings.mute) {
            console.log('Window focused, restoring music...', musicPlayerSettings);
            setPlayerVolume(musicPlayerSettings.volume || DefaultMusicVolume);
            saveMusicPlayerSettings({
                ...musicPlayerSettings,
                mute: false
            });
            togglePlayPause();
        }
    }, [windowFocused])

    useEffect(() => {
        const playMusicLine = scene.find(line => line.fn.toLowerCase() === 'playmusic');
        const stopMusicLine = scene.find(line => line.fn.toLowerCase() === 'stopmusic');
        const setMusicVolumeLine = scene.find(line => line.fn.toLowerCase() === 'musicvolume');

        console.log('useEffect: play music', playMusicLine);
        if (playMusicLine) {
            const { intro, key, volume=DefaultMusicVolume, crossfade } = playMusicLine;
            console.log('Playing music for scene', intro, key, storyData?.storyVariables);
            const introPath = storyData?.storyVariables[intro?.replace('$', '')];
            const keyPath = storyData?.storyVariables[key?.replace('$', '')];
            const keyOptions = {
                autoplay: !musicPlayerSettings.mute,
                loop: true,
                onplay: () => {
                    console.log('Key playing:', keyPath, volume);
                    setPlayerVolume(volume);
                },
            };
            if (introPath) {
                console.log('Loading intro', introPath, playerVolume);
                load(musicSrc(introPath), {
                    autoplay: !musicPlayerSettings.mute,
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
    }, [scene, storyData])
}
