import { use } from 'react';
import { AssistantContext } from './AssistantContext';
import { charArtSrc } from '../../asset-sources';

export const Assistant = () => {
    const { imgRef, skin, scale, position, nextTalkTitle } = use(AssistantContext);

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
