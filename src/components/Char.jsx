import React from 'react';
import { charImageSrc } from '../fetch.js';

export const Char = ({ line }) => {
    // eslint-disable-next-line no-unused-vars
    const { name, name2, focus } = line;

    return <div className="dialog-char">
        <code>{JSON.stringify(line)}</code>
        {name && <img src={charImageSrc(name)} alt="Character" />}
        {name2 && <img src={charImageSrc(name)} alt="Character 2" />}
    </div>;
}
//https://raw.githubusercontent.com/akgcc/arkdata/main/assets/avg/characters/avg_npc_003%231%241.png

