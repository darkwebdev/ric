import { useRef, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { AssistantContext } from './AssistantContext.js';

export const AssistantProvider = ({ children }) => {
    const imgRef = useRef(null);
    const [opId, setOpId] = useState();
    const [skin, setSkin] = useState();
    const [scale, setScale] = useState(100);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [assistant, saveAssistant] = useLocalStorage('assistant');

    return <AssistantContext.Provider value={{
        opId, setOpId,
        skin, setSkin,
        scale, setScale,
        position, setPosition,
        assistant, saveAssistant,
        imgRef,
    }}>
        {children}
    </AssistantContext.Provider>
}
