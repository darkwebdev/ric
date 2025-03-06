import { useContext } from 'react';
import { AssistantContext } from './AssistantContext.js';

export const AssistantTalk = ({ quotes = [] }) => {
    const { talkTitle } = useContext(AssistantContext);
    const TextDefault = 'Good day, Doctah.';
    const text = quotes.find(quote => quote.voiceTitle === talkTitle)?.voiceText || TextDefault;

    return (
        <p className="assistant-text" onMouseDown={e => e.stopPropagation()}>
            {text}
        </p>
    );
};
// Idle
// Talk 1
// Talk 2
// Talk 3
