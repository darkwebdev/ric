import { fn } from '@storybook/test';
import { SceneBackground, SceneForeground } from './index';

export default {
    title: 'Story/Scene',
    component: SceneForeground,
    args: { onClick: fn(), onPrevClick: fn(), onReturnClick: fn() },
};

export const Unknown = {
    args: {
        scene: [{
            fn: 'Unknown',
            foo: 'bar',
        }],
    },
};

export const Text = {
    args: {
        scene: [{
            fn: 'Text',
            text: 'Text',
        }],
    },
};

export const TextComplex = {
    args: {
        scene: [{
            fn: 'Text',
            text: 'As long as you cast your vote and <color=#ee4321>complete all the milestone missions</color>, you\'ll receive the milestone rewards corresponding to the artist you voted for!',
        }],
    },
};

export const NameText = {
    args: {
        scene: [{
            fn: 'Text',
            name: 'Host',
            text: 'As long as you cast your vote and <color=#ee4321>complete all the milestone missions</color>, you\'ll receive the milestone rewards corresponding to the artist you voted for!',
        }],
    },
};

export const Subtitle = {
    args: {
        scene: [{
            fn: 'Subtitle',
            text: 'They say there\'s gonna be another attack in about half an hour. You want some water?',
        }]
    }
};

export const Sticker = {
    args: {
        scene: [{
            fn: 'Sticker',
            id: 'st1',
            text: 'I really want to go back and have a look, too.',
        }]
    }
};

export const Delay = {
    args: {
        scene: [{
            fn: 'Delay',
            time: '1',
        }],
    },
};

export const Image = args =>
    <SceneBackground scene={[{ fn: 'Image', image: 'ac1_4' }]} {...args} />;

export const Background = args =>
    <SceneBackground scene={[{ fn: 'Background', image: 'bg_med' }]} {...args} />;

export const Character = {
    args: {
        scene: [
            {
                fn: 'Character',
                name: 'avg_npc_008',
            }
        ],
    },
};

export const Characters = {
    args: {
        scene: [
            {
                fn: 'Character',
                name: 'avg_npc_010',
                name2: 'avg_npc_008',
            },
        ],
    },
};

export const CharacterOnBackground = args => <>
    <SceneBackground scene={[{ fn: 'Background', image: 'bg_med' }]} {...args} />
    <SceneForeground scene={[{ fn: 'Character', name: 'avg_npc_008' }]} {...args} />
</>;

export const CharacterSlot = {
    args: {
        scene: [
            {
                fn: 'Charslot',
                name: 'avg_1034_jesca2_1#14$1',
            }
        ],
    },
};

export const CharacterSlotUnfocused = {
    args: {
        scene: [
            {
                fn: 'Charslot',
                name: 'avg_1034_jesca2_1#14$1',
                focus: 'n'
            }
        ],
    },
};

export const CharacterSlotLeft = {
    args: {
        scene: [
            {
                fn: 'Charslot',
                name: 'avg_1034_jesca2_1#14$1',
                slot: 'l',
            }
        ],
    },
};

export const CharacterSlots2 = {
    args: {
        scene: [
            {
                fn: 'Charslot',
                name: 'avg_1034_jesca2_1#14$1',
                slot: 'r',
            },
            {
                fn: 'Charslot',
                name: 'avg_npc_1034_1#1$1',
                slot: 'l',
            }
        ],
    },
};

export const CharacterSlots3 = {
    args: {
        scene: [
            {
                fn: 'Charslot',
                name: 'avg_1034_jesca2_1#14$1',
                slot: 'r',
                focus: 'r',
            },
            {
                fn: 'Charslot',
                name: 'avg_4104_coldst_1#1$1',
                slot: 'm',
                focus: 'r',
            },
            {
                fn: 'Charslot',
                name: 'avg_npc_1034_1#1$1',
                slot: 'l',
                focus: 'r',
            },
        ],
    },
};

export const CharacterSlotsOnBackground = args => <>
    <SceneBackground scene={[{ fn: 'Background', image: 'bg_iceforest_2' }]} {...args} />
    <SceneForeground scene={[{
            fn: 'Charslot',
            name: 'avg_1034_jesca2_1#14$1',
            slot: 'r',
            focus: 'n',
        },
        {
            fn: 'Charslot',
            name: 'avg_4104_coldst_1#1$1',
            slot: 'm',
            focus: 'm',
        },
        {
            fn: 'Charslot',
            name: 'avg_npc_1034_1#1$1',
            slot: 'l',
            focus: 'n',
        },
    ]} {...args} />
</>;

export const Blocker = {
    args: {
        scene: [
            {
                fn: 'Blocker',
                r: '0',
                g: '0',
                b: '0',
                a: '1',
                fadetime: '1',
            }
        ],
    },
};

export const TransparentBlockerOnBg = args => <>
    <SceneBackground scene={[{ fn: 'Background', image: 'bg_med' }]} {...args} />
    <SceneForeground scene={[{
        fn: 'Blocker',
        r: '0',
        g: '0',
        b: '0',
        a: '0.5',
        fadetime: '1'
    }]} {...args} />
</>;

export const BlockerOnCharOnBg = args => <>
    <SceneBackground scene={[{ fn: 'Background', image: 'bg_motorway' }]} {...args} />
    <SceneForeground scene={[
        { fn: 'Character', name: 'avg_npc_029' },
        {
            fn: 'Blocker',
            r: '0',
            g: '0',
            b: '0',
            a: '0.8',
            fadetime: '1'
        }
    ]} {...args} />
</>;

export const CharOnBgWithText = args => <>
    <SceneBackground scene={[{ fn: 'Background', image: 'bg_motorway' }]} {...args} />
    <SceneForeground scene={[
        { fn: 'Blocker', a: '0', },
        { fn: 'Character', name: 'avg_npc_029' },
        { fn: 'Text', name: 'Butler', text: 'Young Master, are you asleep?' }
    ]} {...args} />
</>;
