import React from 'react';
import { charImageSrc } from '../../fetch.js';

export const Character = ({ line }) => {
    const { name, name2, focus } = line;
    const img1class = `dialog-char-img${name2 ? ' dialog-char-img-1' : ''}${focus === '2' ? ' dialog-char-img-shade' : ''}`;
    const img2class = `dialog-char-img dialog-char-img-2${focus === '1' ? ' dialog-char-img-shade' : ''}`;

    return <div className="dialog-char">
        <code>{JSON.stringify(line)}</code>
        {name &&
            <img
                src={charImageSrc(name)}
                alt="Character"
                className={img1class}
            />
        }
        {name2 &&
            <img
                src={charImageSrc(name2)}
                alt="Character 2"
                className={img2class}
            />
        }
    </div>;
}
//https://raw.githubusercontent.com/akgcc/arkdata/main/assets/avg/characters/avg_npc_003%231%241.png

