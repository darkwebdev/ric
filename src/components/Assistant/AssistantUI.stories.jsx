import { action } from '@storybook/addon-actions';
import { AssistantUI } from './index.js';
import { AssistantContext } from './AssistantContext.js';

export default {
    title: 'Assistant/UI',
    component: AssistantUI,
    argTypes: {
        opId: { control: 'text' },
        skin: { control: 'text' },
        scale: { control: 'range', min: 0, max: 100 },
        position: { control: 'object' },
    },
};

export const Default = args =>
    <AssistantContext.Provider value={{
        opId: 'char_4134_cetsyr',
        skin: 'char_4134_cetsyr_1',
        position: { x: 0, y: 0 },
        scale: 50,
        nextTalkTitle: action('onClick'),
        ...args
    }}>
        <AssistantUI />
    </AssistantContext.Provider>

export const EditMode = args =>
    <AssistantContext.Provider value={{
        opId: 'char_4134_cetsyr',
        skin: 'char_4134_cetsyr_1',
        position: { x: 0, y: 0 },
        scale: 50,
        nextTalkTitle: action('onClick'),
        ...args
    }}>
        <AssistantUI />
    </AssistantContext.Provider>
