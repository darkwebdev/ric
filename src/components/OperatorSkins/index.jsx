import { useState } from 'react';
import { ButtonGroup } from '../UI/ButtonGroup';
import { Button, ButtonTypes, ButtonVariants, IconTypes } from '../UI/Button';
import { Skin } from './Skin';
import './style.css';

export const OperatorSkins = ({
  operator,
  selected = 0,
  onChange = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  children,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useState(selected);

  console.log('OperatorSkins', operator);

  return (
    <div {...rest} className="skin-selector">
    <h2>{operator.name}</h2>
    <ul className="operator-skins">
      {operator.skins.map((skin, i) => {
        const skinGroupId = skin.displaySkin.skinGroupId;
        // const isEliteSkin = skinGroupId.startsWith('ILLUST_');
        const onClick = () => {
          setSelectedIndex(i);
          onChange(skin.skinId);
        };

        return <Skin
          Tag="li"
          key={skin.portraitId}
          portraitId={skin.portraitId}
          skinName={skin.displaySkin.skinName}
          isSelected={selectedIndex === i}
          skinGroupId={skinGroupId}
          onClick={onClick}
        />;
      })}
    </ul>
    <p>Select this outfit as assistant outfit?</p>
    <ButtonGroup>
      <Button
        type={ButtonTypes.Secondary}
        icon={IconTypes.Cancel}
        variant={ButtonVariants.Liquid}
        onClick={onCancel}
        text="Cancel"
      />
      <Button
        type={ButtonTypes.Primary}
        icon={IconTypes.Confirm}
        variant={ButtonVariants.Liquid}
        onClick={onConfirm}
        text="Confirm"
      />
    </ButtonGroup>
  </div>)
}
