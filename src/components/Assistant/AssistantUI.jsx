import { useContext, useEffect, useState } from 'react';
import { fetchOperators } from '../../network.js';
import { AssistantContext } from './AssistantContext.js';
import { AssistantEdit } from './AssistantEdit.jsx';
import { AssistantTalk } from './AssistantTalk.jsx';
import { Button, ButtonTypes, IconTypes } from '../UI/Button';
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

    const onScroll = e => {
        e.preventDefault();
        setScale(prevScale => Math.min(500, Math.max(50, prevScale - e.deltaY * 0.1)));
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

    const operator = opId ? operators?.find(({ charId }) => charId === opId) : undefined;

    const onOpChange = e => {
        const newOpId = e.target.value;
        setOpId(newOpId);
        const newOp = operators.find(({ charId }) => charId === newOpId);
        setSkin(newOp.skins[0].portraitId);
    };

    return (
        <div
            className={`assistant${isEditMode ? ' assistant-edit' : ''}`}
            onMouseDown={isEditMode ? onMouseDown : undefined}
            onMouseMove={isEditMode ? onMouseMove : undefined}
            onMouseUp={isEditMode ? onMouseUp : undefined}
            onWheel={isEditMode ? onScroll : undefined}
        >
            <div className="assistant-controls" onMouseDown={e => e.stopPropagation()}>
                {!isEditMode ?
                    <Button type={ButtonTypes.Icon} icon={IconTypes.Change} onClick={() => setEditMode(true)} /> :
                    <AssistantEdit
                        operators={operators}
                        operator={operator}
                        skin={skin}
                        onSkinChange={setSkin}
                        scale={scale}
                        setScale={setScale}
                        onSave={onSaveEdit}
                        onCancel={onCancelEdit}
                        onOpChange={onOpChange}
                    />
                }
            </div>
            {!isEditMode && operator && (
                <AssistantTalk quotes={operator.quotes} />
            )}
        </div>
    );
};
