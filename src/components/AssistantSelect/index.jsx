import { useState } from 'react';
import { OperatorAvatar } from '../OperatorAvatar';
import { OperatorSkins } from '../OperatorSkins';
import { SelectGrid } from '../UI/SelectGrid';
import './style.css';

export const AssistantSelect = ({
  operators,
  operator,
  skin,
  onSkinChange = () => {},
  onAssistantChange = () => {},
}) => {
  const [savedAssistant, setSavedAssistant] = useState(operator?.charId);
  const [assistant, setAssistant] = useState(savedAssistant);
  const [skinSelectorShown, setSkinSelectorShown] = useState(false);

  console.log('AssistantSelect', operators, operator, assistant, savedAssistant, skin);

  const operatorItems = operators?.map(op => ({
    value: op.charId,
    label: op.name,
    rarity: op.rarity,
  })) || [];

  const onOpChange = op => {
    console.log('onOpChange', op);
    setAssistant(op);
    onAssistantChange(op);
  };

  const onCancel = () => {
    setAssistant(savedAssistant);
  };

  const onConfirm = () => {
    setSavedAssistant(assistant);
    setSkinSelectorShown(true);
  };

  return operators && (
    <div className={`assistant-skin-selector ${skinSelectorShown ? 'skin-selector-mode' : 'op-selector-mode'}`}>
      {!skinSelectorShown ? (
        <SelectGrid
          className="assistant-select"
          value={assistant}
          onChange={onOpChange}
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          {operatorItems.map(item =>
            <SelectGrid.Item value={item.value} key={item.value} className="assistant-item">
              <OperatorAvatar avatarId={item.value} rarity={item.rarity} name={item.label}/>
            </SelectGrid.Item>
          )}
        </SelectGrid>
        ) : (
          <OperatorSkins
            operator={opById(operators, assistant)}
            onChange={onSkinChange}
            onConfirm={onConfirm}
            onCancel={() => {
              setSkinSelectorShown(false);
              setAssistant(savedAssistant);
            }}
          />
      )}
    </div>
  );
};

const opNameById = (ops, id) =>
  ops.find(op => op.charId === id)?.name || 'Unknown Operator';

const opById = (ops, id) =>
  ops.find(op => op.charId === id);
