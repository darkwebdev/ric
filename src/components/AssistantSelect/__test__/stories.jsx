import { action } from '@storybook/addon-actions';
import { AssistantSelect } from '../index';
import { operators } from './ops';

export default {
    title: 'Assistant/Select',
    component: AssistantSelect,
    argTypes: {},
};

export const Default = {
    args: {
        operators,
        operator: operators[1],
        skin: operators[1].skins[1].portraitId,
        onOpChange: action('onOpChange'),
        onSkinChange: action('onSkinChange'),
    },
};
