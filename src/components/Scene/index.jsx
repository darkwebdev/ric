import { Blocker } from '../fns/Blocker.jsx';
import { Image } from '../fns/Image.jsx';
import { Background } from '../fns/Background.jsx';
import { Character } from '../fns/Character.jsx';
import { Text } from '../fns/Text';
import './style.css';

export const SceneForeground = ({ scene = [], index }) =>
    <div className={`scene-screen scene-${index}`}>
        {scene.map((line, i) => {
            const Fn = SceneFgFns[line.fn];
            return Fn ? <Fn line={line} key={`$fn}-${i}`}/> : null;
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
    Character,
    Blocker,
};

const SceneBgFns = {
    Image,
    Background,
};
