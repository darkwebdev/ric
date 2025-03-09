import { useContext } from 'react';
import { AssistantContext } from './AssistantContext.js';
import { charArtSrc } from '../../network.js';

export const Assistant = () => {
    const { imgRef, skin, scale, position, nextTalkTitle } = useContext(AssistantContext);

    return skin &&
        <div className="assistant-art">
            <img
                ref={imgRef}
                src={charArtSrc(skin)}
                draggable="false"
                style={{ transform: `scale(${scale / 100}) translateX(${position.x}px) translateY(${position.y}px)` }}
                alt="Your Assistant"
                onClick={nextTalkTitle}
            />
        </div>
};
