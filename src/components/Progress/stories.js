import { Progress } from './index.jsx';

export default {
    title: 'Story/Progress',
    component: Progress,
    parameters: {
    },
    argTypes: {
        value: {
            control: {
                type: 'number',
                min: 0,
            },
        },
        max: {
            control: {
                type: 'number',
                min: 0,
            },
        },
    },
};

export const Default = {
    args: {
        value: 50,
        max: 100,
    },
};

export const WithText = {
    args: {
        value: 50,
        max: 100,
        text: 'completed',
    },
};
