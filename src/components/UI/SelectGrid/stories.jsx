import { action } from '@storybook/addon-actions';
import { SelectGrid } from './index';
import { useState } from 'react';
import { Dropdown } from '../Dropdown';
import { OperatorAvatar } from '../../OperatorAvatar';

export default {
  title: 'UI/SelectGrid',
  component: SelectGrid,
};

export const Default = {
  args: {
    children: [
      <SelectGrid.Item key="1" value="1">item 1</SelectGrid.Item>,
      <SelectGrid.Item key="2" value="2">item 2</SelectGrid.Item>,
      <SelectGrid.Item key="3" value="3">item 3</SelectGrid.Item>,
    ]
  },
};

export const WithImagesAndText = args => {
  const [savedValue, setSavedValue] = useState('char_301_cutter');
  const [value, setValue] = useState(savedValue);

  return <SelectGrid
    {...args}
    value={value}
    onChange={v => {setValue(v); action('onChange')(v);}}
    onCancel={() => {setValue(savedValue); action('onCancel')(savedValue);}}
    onConfirm={() => {setSavedValue(value); action('onConfirm')(value);}}
  >
    <SelectGrid.Item value="char_301_cutter">
      <OperatorAvatar rarity="TIER_4" avatarId="char_301_cutter" name="Cutter" />
    </SelectGrid.Item>
    <SelectGrid.Item value="char_4177_brigid">
      <OperatorAvatar rarity="TIER_5" avatarId="char_4177_brigid" name="Brigid" />
    </SelectGrid.Item>
    <SelectGrid.Item value="char_4010_etlchi">
      <OperatorAvatar rarity="TIER_6" avatarId="char_4010_etlchi" name="Entelechia" />
    </SelectGrid.Item>
    <SelectGrid.Item value="char_1040_blaze2">
      <OperatorAvatar rarity="TIER_6" avatarId="char_1040_blaze2" name="Blaze" />
    </SelectGrid.Item>
    <SelectGrid.Item value="char_222_bpipe">
      <OperatorAvatar rarity="TIER_6" avatarId="char_222_bpipe" name="Bagpipe" />
    </SelectGrid.Item>
    <SelectGrid.Item value="char_1013_chen2">
      <OperatorAvatar rarity="TIER_6" avatarId="char_1013_chen2" name="Ch'en" />
    </SelectGrid.Item>
  </SelectGrid>;
};
