import React from 'react';
import { parseContent } from '../../../parse.js';

export const Text = ({ line }) => {
    const { name, text } = line;

    return <div className="dialog-text">
        <div className="dialog-name">{name}</div>
        <p dangerouslySetInnerHTML={{ __html: parseContent(text) }}></p>
    </div>;
}
