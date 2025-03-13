import { AssistantContext } from './AssistantContext.js';
import { AssistantTalk } from './AssistantTalk.jsx';
import { TalkTitles } from '../../const.js';

export default {
    title: 'Assistant/Talk',
    component: AssistantTalk,
    argTypes: {
        talkTitle: {
            options: TalkTitles,
            control: { type: 'select' },
        },
    },
};

const quotes = [{
    voiceTitle: TalkTitles[0],
    voiceText: 'Doctor, you know how busy your schedule is today, yes?'
}, {
    voiceTitle: TalkTitles[1],
    voiceText: 'I once ran into the Saintess at the foot of the mountain, where she stuffed a book into my hands. She told me that, if I\'m bored, I might as well try copying some scripture. I heeded her suggestion and copied a passage every day. At first, I did it just to pass the time, but then I realized it helps me to relax a little too. I find it intriguing.'
}, {
    voiceTitle: TalkTitles[2],
    voiceText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}, {
    voiceTitle: TalkTitles[3],
    voiceText: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga'
}];

export const Default = args =>
    <AssistantContext.Provider value={{ ...args }}>
        <AssistantTalk quotes={quotes}/>
    </AssistantContext.Provider>

export const Greeting = args =>
    <AssistantContext.Provider value={{
        talkTitle: TalkTitles[0],
        ...args
    }}>
        <AssistantTalk quotes={quotes}/>
    </AssistantContext.Provider>

export const Talk1 = args =>
    <AssistantContext.Provider value={{
        talkTitle: TalkTitles[1],
        ...args
    }}>
        <AssistantTalk quotes={quotes}/>
    </AssistantContext.Provider>
