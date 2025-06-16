import { useContext, useEffect, useState } from 'react';
import { fetchOperators } from '../../network';
import { AssistantContext } from '../Assistant';
import { AssistantTalk } from '../AssistantTalk';
import { Button, ButtonTypes, IconTypes } from '../UI/Button';
import { Modes } from '../Home';
import { Slider } from '../UI/Slider';
import { AssistantSelect } from '../AssistantSelect';
import './style.css';

export const AssistantUI = ({
  mode, setMode = () => {
  }, onSave = () => {
  }, onCancel = () => {
  }
}) => {
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
  };

  const onSaveEdit = () => {
    saveAssistant({ operator: opId, scale, position, skin });
    onSave();
  };

  const onCancelEdit = () => {
    if (assistant) {
      setOpId(assistant.operator);
      setScale(assistant.scale);
      setSkin(assistant.skin);
      setPosition(assistant.position);
    }
    onCancel();
  };

  const onMouseDown = e => {
    document.elementsFromPoint(e.clientX, e.clientY).forEach(el => {
      if (imgRef.current?.contains(el)) {
        setDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    });
  };

  const operator = opId ? operators?.find(({ charId }) => charId === opId) : undefined;

  const onOpChange = newOpId => {
    console.log('onOpChange', newOpId);
    setOpId(newOpId);
    const newOp = operators.find(({ charId }) => charId === newOpId);
    setSkin(newOp.skins[0].portraitId);
  };

  const modeControls = {
    [Modes.Default]: <>
      <Button
        type={ButtonTypes.Icon}
        icon={IconTypes.Change}
        onClick={() => setMode(Modes.Edit)}
      />
      {operator && <AssistantTalk quotes={operator.quotes}/>}
    </>,

    [Modes.Edit]: <>
      <Button
        type={ButtonTypes.Secondary}
        icon={IconTypes.Change}
        text="ChangeAssistant"
        onClick={() => setMode(Modes.Select)}
      />
      <Slider value={scale} onChange={setScale}/>
      <div className="assistant-edit-buttons">
        <Button
          type={ButtonTypes.Primary}
          icon={IconTypes.Confirm}
          text="Confirm"
          onClick={onSaveEdit}
        />
        <Button
          type={ButtonTypes.Secondary}
          icon={IconTypes.Cancel}
          text="Cancel"
          onClick={onCancelEdit}
        />
      </div>
    </>,

    [Modes.Select]:
      <AssistantSelect
        operators={operators}
        operator={operator}
        skin={skin}
        onSkinChange={setSkin}
        onAssistantChange={onOpChange}
      />,
  };

  return (
    <div
      className={`assistant ${mode !== Modes.Default ? `assistant-${mode}-mode` : ''}`}
      onMouseDown={mode === Modes.Edit ? onMouseDown : undefined}
      onMouseMove={mode === Modes.Edit ? onMouseMove : undefined}
      onMouseUp={mode === Modes.Edit ? onMouseUp : undefined}
      onWheel={mode === Modes.Edit ? onScroll : undefined}
    >
      <div className="assistant-controls" onMouseDown={e => e.stopPropagation()}>
        {modeControls[mode]}
      </div>
    </div>
  );
};
