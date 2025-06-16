import { OperatorAvatar } from './index';
import { Rarities } from '../../const';

export default {
    title: 'Assistant/OperatorAvatar',
    component: OperatorAvatar,
    argTypes: {
    },
    parameters: {
        layout: 'centered',
    },
};

export const _4star = {
    args: {
        rarity: 'TIER_4',
        avatarId: 'char_301_cutter',
        name: 'Cutter',
    },
}

export const _5star = {
    args: {
        rarity: 'TIER_5',
        avatarId: 'char_4177_brigid',
        name: 'Brigid',
    },
}

export const _6star = {
    args: {
        rarity: 'TIER_6',
        avatarId: 'char_4010_etlchi',
        name: 'Entelechia',
    },
}

export const BigFont = args => (
  <div style={{ fontSize: '25px', width: '180px' }}>
    <OperatorAvatar
      {...args}
      rarity={Rarities[5]}
      avatarId="char_1012_skadi2"
      name="Skadi the Corrupting Heart"
    />
  </div>
)
