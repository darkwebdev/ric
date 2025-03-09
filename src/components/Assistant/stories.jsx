import { action } from '@storybook/addon-actions';
import { Assistant, AssistantContext } from './index.js';

export default {
    title: 'Assistant',
    component: Assistant,
    argTypes: {
        opId: { control: 'text' },
        skin: { control: 'text' },
        scale: { control: 'range', min: 0, max: 100 },
        position: { control: 'object' },
    },
};

export const TheresaElite1 = args =>
    <AssistantContext.Provider value={{
        opId: 'char_4134_cetsyr',
        skin: 'char_4134_cetsyr_1',
        position: { x: 0, y: 0 },
        scale: 50,
        nextTalkTitle: action('onClick'),
        ...args
    }}>
        <Assistant />
    </AssistantContext.Provider>

export const TheresaElite2 = args =>
    <AssistantContext.Provider value={{
        opId: 'char_4134_cetsyr',
        skin: 'char_4134_cetsyr_2',
        position: { x: 0, y: 0 },
        scale: 50,
        nextTalkTitle: action('onClick'),
        ...args
    }}>
        <Assistant />
    </AssistantContext.Provider>
