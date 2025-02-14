import React from 'react';
import { Blocker } from '../fns/Blocker.jsx';
import { Image } from '../fns/Image.jsx';
import { BgImage } from '../fns/BgImage.jsx';
import { Char } from '../fns/Char.jsx';
import { Text } from '../fns/Text';

export const DialogScreen = ({
    scene = [],
    onClick = () => {},
    onDelay = () => {},
}) => {
    console.log('<DialogScreen>', scene);
    return <div className="dialog-screen" onClick={onClick}>
        {scene.map(line => {
            const Fn = DialogFns[line.fn];
            if (Fn) {
                const {fn, ...rest} = line;
                console.log('Fn', fn, rest);
                if (line.fn === 'Delay') {
                    onDelay(line.time * 1000);
                } else if (line.fn === 'Blocker') {
                    onDelay(line.fadetime * 1000);
                }
                return <Fn line={line}/>;
            }

            console.log('Unknown fn', line.fn);
            return <code>ignore:&nbsp;{JSON.stringify(line)}</code>;
        })}
    </div>;
}

const DialogFns = {
    Text: Text,
    Character: Char,
    Image: Image,
    Background: BgImage,
    Blocker: Blocker,
    Delay: () => null,
};
