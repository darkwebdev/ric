import { Loading } from './index.jsx';

export default {
    title: 'UI/Loading',
    component: Loading,
};

export const Default = {
    args: {

    },
};

export const WithText = {
    args: {
        text: 'Submitting feedback to the neural network...',
    },
};

export const FullScreen = {
    args: {
        mode: 'fullscreen',
    },
};

export const FullScreenWithText = {
    args: {
        mode: 'fullscreen',
        text: 'Loading...',
    },
};

export const FullScreenWithLongText = {
    args: {
        mode: 'fullscreen',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
};
