import { fn } from '@storybook/test';
import { SceneForeground } from './index';

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

export const TextComplex= {
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
                fn: 'Image',
                image: 'ac1_4',
            }
        ],
    },
};

export const Background = {
    args: {
        scene: [
            {
                fn: 'Background',
                image: 'bg_med',
            }
        ],
    },
};

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

export const CharacterOnBackground = {
    args: {
        scene: [
            {
                fn: 'Background',
                image: 'bg_med',
            },
            {
                fn: 'Character',
                name: 'avg_npc_008',
            }
        ],
    },
};

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

export const TransparentBlockerOnBg = {
    args: {
        scene: [
            {
                fn: 'Blocker',
                r: '0',
                g: '0',
                b: '0',
                a: '0.5',
                fadetime: '1',
            },
            {
                fn: 'Background',
                image: 'bg_med',
            }
        ],
    },
};

export const BlockerOnCharOnBg = {
    args: {
        scene: [
            {
                fn: 'Background',
                image: 'bg_motorway',
            },
            {
                fn: 'Character',
                name: 'avg_npc_029',
            },
            {
                fn: 'Blocker',
                r: '0',
                g: '0',
                b: '0',
                a: '0.8',
                fadetime: '1',
            },
        ],
    },
};

export const CharOnBgWithText = {
    args: {
        scene: [
            {
                fn: 'Blocker',
                a: '0',
            },
            {
                fn: 'Background',
                image: 'bg_motorway',
            },
            {
                fn: 'Character',
                name: 'avg_npc_029',
            },
            {
                fn: 'Text',
                name: 'Butler',
                text: 'Young Master, are you asleep?',
            }
        ],
    },
};
