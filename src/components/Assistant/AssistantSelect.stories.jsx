import { action } from '@storybook/addon-actions';
import { AssistantSelect } from './AssistantSelect.jsx';

export default {
    title: 'AssistantSelect',
    component: AssistantSelect,
    argTypes: {},
};

const operators = [
    {
        name: 'Narantuya',
        charId: 'char_4138_narant',
        rarity: 'TIER_6',
        skins: [
            {
                avatarId: 'char_4138_narant',
                charId: 'char_4138_narant',
                portraitId: 'char_4138_narant_1',
                skinId: 'char_4138_narant#1',
                displaySkin: {
                    skinGroupName: 'Default Outfit',
                },
            },
            {
                charId: 'char_4138_narant',
                avatarId: 'char_4138_narant_2',
                portraitId: 'char_4138_narant_2',
                skinId: 'char_4138_narant#2',
                displaySkin: {
                    skinGroupName: 'Default Outfit',
                }
            }
        ]
    },
    {
        name: 'Degenbrecher',
        rarity: 'TIER_6',
        charId: 'char_4116_blkkgt',
        skins: [
            {
                skinId: 'char_4116_blkkgt#1',
                charId: 'char_4116_blkkgt',
                avatarId: 'char_4116_blkkgt',
                portraitId: 'char_4116_blkkgt_1',
                displaySkin: {
                    skinGroupName: 'Default Outfit',
                }
            },
            {
                skinId: 'char_4116_blkkgt#2',
                charId: 'char_4116_blkkgt',
                avatarId: 'char_4116_blkkgt_2',
                portraitId: 'char_4116_blkkgt_2',
                displaySkin: {
                    skinGroupName: 'Default Outfit',
                }
            },
            {
                skinId: 'char_4116_blkkgt@witch#5',
                charId: 'char_4116_blkkgt',
                avatarId: 'char_4116_blkkgt_witch#5',
                portraitId: 'char_4116_blkkgt_witch#5',
                displaySkin: {
                    skinName: '暗月的影子',
                    skinGroupName: '巫异盛宴/V',
                }
            }
        ],
    }
];


export const Default = {
    args: {
        operators,
        operator: operators[1],
        skin: operators[1].skins[1].portraitId,
        onOpChange: action('onOpChange'),
        onSkinChange: action('onSkinChange'),
    },
};
