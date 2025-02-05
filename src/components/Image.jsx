import React from 'react';
import { imageSrc } from '../fetch.js';

export const Image = ({ line }) => {
    const { image } = line;

    return <>
        <code>{JSON.stringify(line)}</code>
        {image && <img
            className="dialog-image"
            src={imageSrc(image)}
            role="presentation"
            alt=""
        />}
    </>;
}
