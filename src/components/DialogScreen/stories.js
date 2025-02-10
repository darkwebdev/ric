import { fn } from '@storybook/test';
import { DialogScreen } from './index';

export default {
    title: 'DialogScreen',
    component: DialogScreen,
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

export const NameText = {
    args: {
        scene: [{
            fn: 'Text',
            name: 'Name',
            text: 'Text',
        }],
    },
};

export const Delay = {
    args: {
        scene: [{
            fn: 'Delay',
            time: '1',
        }],
    },
};

export const Image = {
    args: {
        scene: [
            {
                'fn': 'Image',
                'image': 'ac1_4',
            }
        ],
    },
};

export const Background = {
    args: {
        scene: [
            {
                'fn': 'Background',
                'image': 'bg_med',
            }
        ],
    },
};

export const Character = {
    args: {
        scene: [
            {
                'fn': 'Character',
                'name': 'avg_npc_008',
            }
        ],
    },
};

export const CharacterOnBackground = {
    args: {
        scene: [
            {
                'fn': 'Background',
                'image': 'bg_med',
            },
            {
                'fn': 'Character',
                'name': 'avg_npc_008',
            }
        ],
    },
};


