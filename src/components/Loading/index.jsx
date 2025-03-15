import { useEffect, useState } from 'react';
import image from '../../img/loading.jpg';
import Shape from './shape.svg?react';
import './style.css';

export const MinLoadingTimeMs = 1000;

export const Loading = ({ mode, text, enabled = true }) => {
    const [isShown, setShown] = useState(enabled);

    useEffect(() => {
        let timer;
        if (enabled) {
            setShown(true);
            timer = setTimeout(() => {
                setShown(false);
            }, MinLoadingTimeMs);
        } else {
            timer = setTimeout(() => {
                setShown(false);
            }, MinLoadingTimeMs);
        }
        return () => clearTimeout(timer);
    }, [enabled]);

    const loadingFullscreen = <div className="loading-fullscreen">
        <img src={image} role="presentation" alt=""/>
        <p>{text}</p>
    </div>;

    const loadingOverlay = <div className="loading-overlay">
        <Shape />
        <p>{text}</p>
    </div>;

    return isShown && <div className="loading">
        {mode === 'fullscreen' ? loadingFullscreen : loadingOverlay}
    </div>;
};
