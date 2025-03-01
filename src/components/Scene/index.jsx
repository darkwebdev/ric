import { Blocker } from '../fns/Blocker.jsx';
import { Image } from '../fns/Image.jsx';
import { Background } from '../fns/Background.jsx';
import { Character } from '../fns/Character.jsx';
import { Text } from '../fns/Text';
import './style.css';

export const Scene = ({ scene = [], }) =>
    <div className="scene-screen">
        {scene.map((line, i) => {
            const Fn = DialogFns[line.fn];
            if (Fn) {
                return <Fn line={line} key={`$fn}-${i}`}/>;
            }
        })}
    </div>

const DialogFns = {
    Text,
    Character,
    Image,
    Background,
    Blocker,
};
