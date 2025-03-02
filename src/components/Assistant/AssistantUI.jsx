import { useContext, useEffect, useState } from 'react';
import { AssistantContext } from './AssistantContext.js';
import { fetchOperators } from '../../network.js';
import { Rarities } from '../../const.js';

import iconChange from '../../img/icon_rechange.png';
import iconConfirm from '../../img/icon_confirm.png';
import iconCancel from '../../img/icon_cancel.png';
import './style.css';

export const AssistantUI = () => {
    const {
        imgRef,
        opId, setOpId,
        skin, setSkin,
        scale, setScale,
        position, setPosition,
        assistant, saveAssistant,
    } = useContext(AssistantContext);

    const [operators, setOperators] = useState();
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isDragging, setDragging] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {
        (async () => {
            const opData = await fetchOperators();
            if (opData) {
                setOperators(opData);
            }
        })();
        if (assistant) {
            setOpId(assistant.operator);
            setSkin(assistant.skin);
            setScale(assistant.scale);
            setPosition(assistant.position);
        }
    }, []);

    const onMouseMove = (e) => {
        if (isDragging) {
            setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
        }
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    const onScroll = (e) => {
        e.preventDefault();
        setScale((prevScale) => Math.min(500, Math.max(50, prevScale - e.deltaY * 0.1)));
    }

    const onSaveEdit = () => {
        saveAssistant({ operator: opId, scale, position, skin });
        setEditMode(false);
    }

    const onCancelEdit = () => {
        if (assistant) {
            setOpId(assistant.operator);
            setScale(assistant.scale);
            setSkin(assistant.skin);
            setPosition(assistant.position);
        }
        setEditMode(false);
    }

    const onMouseDown = e => {
        document.elementsFromPoint(e.clientX, e.clientY).forEach(el => {
            if (imgRef.current?.contains(el)) {
                setDragging(true);
                setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
            }
        });
    };

    const onEdit = () => {
        setEditMode(true);
    };

    const editButton = <button className="icon-button" onClick={onEdit}>
        <img src={iconChange} role="presentation" style={{ filter: 'invert(1)', width: '90%' }} alt="" />
    </button>;
    const saveButton = <button onClick={onSaveEdit}><img src={iconConfirm} role="presentation" alt="" />Confirm Changes</button>;
    const cancelButton = <button onClick={onCancelEdit}><img src={iconCancel} role="presentation" alt="" />Revert Changes</button>;

    const operator = opId ? operators?.find(({ charId }) => charId === opId) : undefined;

    const skinName = (skin, i) => {
        return skin.skinGroupName === 'Default Outfit' ? `Elite ${i+1}` : skin.skinGroupName;
    }

    const onOpChange = e => {
        const newOpId = e.target.value;
        setOpId(newOpId);
        const newOp = operators.find(({ charId }) => charId === newOpId);
        setSkin(newOp.skins[0].portraitId);
    };
    const EditControls = () => <>
        {operators && <>
            <select
                className="assistant-select"
                defaultValue={opId}
                onChange={onOpChange}
            >
                {operators.map(op => (
                    <option key={op.charId} value={op.charId}>
                        {Rarities.indexOf(op.rarity)+1}* {op.name}
                    </option>
                ))}
            </select>
            {operator &&
                <select
                    className="assistant-skin-select"
                    defaultValue={skin}
                    onChange={e => setSkin(e.target.value)}
                >
                    {operator.skins.map(({ skinId, portraitId, displaySkin }, i) => (
                        <option key={skinId} value={portraitId}>
                            {skinName(displaySkin, i)}
                        </option>
                    ))}
                </select>
            }
        </>}
        <input type="range" min="100" max="500" value={scale} onChange={(e) => setScale(e.target.value)} />
        {saveButton}
        {cancelButton}
    </>;

    return (
        <div
            className={`assistant${isEditMode ? ' assistant-edit' : ''}`}
            onMouseDown={isEditMode ? onMouseDown : undefined}
            onMouseMove={isEditMode ? onMouseMove : undefined}
            onMouseUp={isEditMode ? onMouseUp : undefined}
            onWheel={isEditMode ? onScroll : undefined}
        >
            <div className="assistant-controls" onMouseDown={e => e.stopPropagation()}>
                {isEditMode ? <EditControls /> : editButton}
            </div>
            {!isEditMode && operator && (
                <p className="assistant-text" onMouseDown={e => e.stopPropagation()}>
                    {operator.quotes.find(({ voiceTitle }) => voiceTitle === 'Greeting').voiceText}
                </p>
            )}
        </div>
    );
};
// Idle
// Talk 1
// Talk 2
// Talk 3
