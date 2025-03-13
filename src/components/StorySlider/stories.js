import { fn } from '@storybook/test';
import { StorySlider } from './index.jsx';
import scenes from './scenes.json';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: 'Story/StorySlider',
    component: StorySlider,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: { onClick: fn() },
};

export const Default = {
    args: {
        scenes,
        sceneIndex: 0,
    },
};
