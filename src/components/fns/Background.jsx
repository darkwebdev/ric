import React from 'react';
import { backgroundSrc } from '../../fetch.js';

export const Background = ({ line }) => {
    const { image } = line;

    return <>
        <code>{JSON.stringify(line)}</code>
        {image && <img
            className="dialog-image dialog-background"
            src={backgroundSrc(image)}
            role="presentation"
            alt=""
        />}
    </>;
}
