import { useEffect } from 'react'
import { useAudioPlayerContext } from 'react-use-audio-player';
import { musicSrc } from '../../asset-sources';
import { DefaultMusicVolume } from '../../const';

export const PlayMusic = ({ line, storyVariables }) => {
    const { intro, key, volume = DefaultMusicVolume } = line;
    const { load } = useAudioPlayerContext();

    useEffect(() => {
        const loadingOptions = { initialVolume: volume };
        if (intro) {
            const introPath = musicSrc(storyVariables[intro.replace('$', '')]);
            load(introPath, loadingOptions);
            console.log('PlayMusic: loading intro', introPath);
        }
        if (key) {
            const keyPath = musicSrc(storyVariables[key.replace('$', '')]);
            load(keyPath, loadingOptions);
            console.log('PlayMusic: loading key', keyPath);
        }
    }, []);
};
