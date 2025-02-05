import React from 'react';
import { Char } from './Char.jsx';
import { BgImage } from './BgImage.jsx';
import { Blocker } from './Blocker.jsx';
import { Image } from './Image.jsx';
import { Text } from './Text.jsx';

export const DialogLine = ({ line }) => {
    switch (line.fn) {
        case 'Text':
            return <Text line={line} />;
        case 'Character':
            return <Char line={line} />;
        case 'Image':
            return <Image line={line} />;
        case 'Background':
            return <BgImage line={line} />;
        case 'Blocker':
            return <Blocker line={line} />;
        default:
            console.log('Unknown fn', line.fn);
            return <code>ignore:&nbsp;{JSON.stringify(line)}</code>;
    }
}
