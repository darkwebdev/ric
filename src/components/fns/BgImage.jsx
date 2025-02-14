import React from 'react';
import { bgImageSrc } from '../../fetch.js';

export const BgImage = ({ line }) => {
    const { image } = line;

    return <>
        <code>{JSON.stringify(line)}</code>
        {image && <img
            className="dialog-image"
            src={bgImageSrc(image)}
            role="presentation"
            alt=""
        />}
    </>;
}
