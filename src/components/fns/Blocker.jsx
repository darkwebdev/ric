import React from 'react';

export const Blocker = ({ line }) => {
    // eslint-disable-next-line no-unused-vars
    const { block, a=0, r=0, g=0, b=0, fadetime } = line;
    const style = {
        backgroundColor: `rgba(${r},${g},${b},${a})`,
        animationDuration: `${fadetime}s`,
    };
    return <div className="dialog-blocker" style={style} />;
}
