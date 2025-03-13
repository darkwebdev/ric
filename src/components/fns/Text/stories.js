import { Text } from './index.jsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: 'Story/Text',
    component: Text,
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const OneLine = {
    args: {
        line: {
            name: 'Name',
            text: 'Text',
        },
    },
};
