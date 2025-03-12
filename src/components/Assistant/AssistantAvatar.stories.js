import { AssistantAvatar } from './AssistantAvatar.jsx';

export default {
    title: 'AssistantAvatar',
    component: AssistantAvatar,
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
