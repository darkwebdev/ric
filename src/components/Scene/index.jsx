import { Blocker } from '../fns/Blocker';
import { Image } from '../fns/Image';
import { Background } from '../fns/Background';
import { Character } from '../fns/Character';
import { Charslot } from '../fns/Charslot.jsx';
import { Text } from '../fns/Text';
import { Subtitle } from '../fns/Subtitle';
import { Sticker } from '../fns/Sticker';
import { PlayMusic } from '../fns/PlayMusic';
import './style.css';

export const SceneForeground = ({ scene = [], index = 0, storyVariables }) =>
    <div className={`scene-screen scene-${index}`}>
        {scene.map((line, i) => {
            const Fn = SceneFgFns[line.fn];
            return Fn ? <Fn line={line} key={`$fn}-${i}`} storyVariables={storyVariables}/> : null;
        })}
    </div>

export const SceneBackground = ({ scene = [], }) =>
    scene.map((line, i) => {
        const Fn = SceneBgFns[line.fn];
        if (Fn) {
            return <Fn line={line} key={`$fn}-${i}`}/>;
        }
    })

const SceneFgFns = {
    Text,
    Subtitle,
    Sticker,
    Character,
    Charslot,
    Blocker,
    PlayMusic
};

const SceneBgFns = {
    Image,
    Background,
};
