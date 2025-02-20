import image from '../../img/loading.jpg';
import Shape from './shape.svg?react';
import './style.css';

export const Loading = ({ mode, text }) => {
    const loadingFullscreen = <div className="loading-fullscreen">
        <img src={image} role="presentation" alt=""/>
        <p>{text}</p>
    </div>;
    const loadingOverlay = <div className="loading-overlay">
        <Shape />
        <p>{text}</p>
    </div>;
    return <div className="loading">
        {mode === 'fullscreen' ? loadingFullscreen : loadingOverlay}
    </div>;
};
