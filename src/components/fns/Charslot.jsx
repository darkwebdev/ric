import { charImageSrc } from '../../network.js';

export const Charslot = ({ line }) => {
    const { slot, name, focus, posfrom, posto, bstart, bend, duration, isblock } = line;
    const slotClass = {
        l: 'dialog-char-img-left',
        r: 'dialog-char-img-right',
        m: 'dialog-char-img-middle',
    }[slot] || '';
    const focusClass = {
        l: slot !== 'l' ? 'dialog-char-img-shade' : '',
        r: slot !== 'r' ? 'dialog-char-img-shade' : '',
        m: slot !== 'm' ? 'dialog-char-img-shade' : '',
        n: 'dialog-char-img-shade',
    }[focus] || '';

    return name && <div className="dialog-char">
        <img
            src={charImageSrc(name)}
            alt="Character"
            className={`dialog-char-img ${slotClass} ${focusClass}`}
        />
    </div>;
}
