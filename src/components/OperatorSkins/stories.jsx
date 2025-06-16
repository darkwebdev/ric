import { OperatorSkins } from './index';
import { operatorHoshiguma, operatorShining, operatorShining2 } from './skins';
import { Skin } from './Skin';

export default {
  title: 'Assistant/OperatorSkins',
  component: OperatorSkins,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
};

export const DefaultOutfit = args => <Skin
  portraitId={operatorShining.skins[0].portraitId}
  skinGroupId={operatorShining.skins[0].displaySkin.skinGroupId}
  {...args}
/>;

export const DefaultOutfitVsSelected = args =>
  <div style={{ display: 'flex', gap: '1em' }}>
    <Skin
      portraitId={operatorShining.skins[0].portraitId}
      skinGroupId={operatorShining.skins[0].displaySkin.skinGroupId}
      {...args}
    />
    <Skin
      portraitId={operatorShining.skins[0].portraitId}
      skinGroupId={operatorShining.skins[0].displaySkin.skinGroupId}
      isSelected={true}
      {...args}
    />
  </div>;

export const Elite2VsSelected = args =>
  <div style={{ display: 'flex', gap: '1em' }}>
    <Skin
      portraitId={operatorShining.skins[1].portraitId}
      skinGroupId={operatorShining.skins[1].displaySkin.skinGroupId}
      {...args}
    />
    <Skin
      portraitId={operatorShining.skins[1].portraitId}
      skinGroupId={operatorShining.skins[1].displaySkin.skinGroupId}
      isSelected={true}
      {...args}
    />
  </div>;

export const CoralCoastVsSelected = args =>
  <div style={{ display: 'flex', gap: '1em' }}>
    <Skin
      portraitId={operatorShining.skins[2].portraitId}
      skinGroupId={operatorShining.skins[2].displaySkin.skinGroupId}
      {...args}
    />
    <Skin
      portraitId={operatorShining.skins[2].portraitId}
      skinGroupId={operatorShining.skins[2].displaySkin.skinGroupId}
      skinName={operatorShining.skins[2].displaySkin.skinName}
      isSelected={true}
      {...args}
    />
  </div>;

export const DifferentLabels = args =>
  <div style={{ display: 'flex', gap: '1em' }}>
    <Skin
      portraitId={operatorHoshiguma.skins[1].portraitId}
      skinGroupId={operatorHoshiguma.skins[1].displaySkin.skinGroupId}
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId={operatorShining.skins[2].portraitId}
      skinGroupId={operatorShining.skins[2].displaySkin.skinGroupId}
      skinName={operatorShining.skins[2].displaySkin.skinName}
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId={operatorHoshiguma.skins[2].portraitId}
      skinGroupId={operatorHoshiguma.skins[2].displaySkin.skinGroupId}
      skinName={operatorHoshiguma.skins[2].displaySkin.skinName}
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId="char_474_glady_epoque#33"
      skinGroupId="2024#epoque#4"
      skinName="I Am the Tides"
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId="char_179_cgbird_witch#1"
      skinGroupId="2024#witch"
      skinName="an elegy"
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId="char_222_bpipe_race#1"
      skinGroupId="2020#race"
      skinName="Queen, No.1"
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId="char_1028_texas2_iteration#1"
      skinGroupId="2023#iteration"
      skinName="Wingbreaker"
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId="char_1033_swire2_ambienceSynesthesia#4"
      skinGroupId="2024#ambienceSynesthesia"
      skinName="Carriage of the Winds of Time"
      isSelected={true}
      {...args}
    />
    <Skin
      portraitId="char_245_cello_sale#12"
      skinGroupId="2024#sale#3"
      skinName="无我唯识"
      isSelected={true}
      {...args}
    />
  </div>;

export const _2skins = {
  args: {
    operator: operatorShining2,
    selected: 0
  },
};

export const _3skins = {
  args: {
    operator: operatorShining,
    selected: 0
  },
};

export const _4skins = {
  args: {
    operator: operatorHoshiguma,
    selected: 0
  },
};
