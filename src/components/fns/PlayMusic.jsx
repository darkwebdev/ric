import { useEffect } from 'react'
import { useAudioPlayerContext } from 'react-use-audio-player';
import { musicSrc } from '../../asset-sources';

export const PlayMusic = ({ line, storyVariables }) => {
    const { intro, key } = line;
    const { load } = useAudioPlayerContext();

    useEffect(() => {
        if (intro) {
            const introPath = musicSrc(storyVariables[intro.replace('$', '')]);
            load(introPath);
            console.log('PlayMusic: loading intro', introPath);
        }
        if (key) {
            const keyPath = musicSrc(storyVariables[key.replace('$', '')]);
            load(keyPath);
            console.log('PlayMusic: loading key', keyPath);
        }
    }, []);
};
