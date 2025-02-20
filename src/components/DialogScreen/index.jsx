import React from 'react';
import { Blocker } from '../fns/Blocker.jsx';
import { Image } from '../fns/Image.jsx';
import { Background } from '../fns/Background.jsx';
import { Character } from '../fns/Character.jsx';
import { Text } from '../fns/Text';
import './style.css';

export const DialogScreen = ({
    scene = [],
    onClick = () => {},
    onDelay = () => {},
}) => {
    console.log('<DialogScreen>', scene);
    return <div className="dialog-screen" onClick={onClick}>
        {scene.map((line, i) => {
            const {fn, ...rest} = line;
            console.log('Fn', fn, rest);

            if (['Delay', 'Blocker'].includes(fn)) {
                if (line.fn === 'Delay') {
                    onDelay(line.time * 1000);
                } else if (line.fn === 'Blocker') {
                    onDelay(line.fadetime * 1000);
                }
                console.log('Nothing to render for fn', fn);
                return null;
            }

            const Fn = DialogFns[fn];
            if (Fn) {
                return <Fn line={line} key={`$fn}-${i}`}/>;
            }
        })}
    </div>;
}

const DialogFns = {
    Text: Text,
    Character: Character,
    Image: Image,
    Background: Background,
    Blocker: Blocker,
};
