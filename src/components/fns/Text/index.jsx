import React from 'react';
import { parseContent } from '../../../parse.js';

export const Text = ({ line }) => {
    const { name, text } = line;

    return <div className="dialog-text">
        <code>{JSON.stringify(line)}</code>
        <div className="dialog-name">{name}</div>
        <p>{parseContent(text)}</p>
    </div>;
}
