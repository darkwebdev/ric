import { AssistantContext } from './AssistantContext.js';
import { AssistantTalk } from './AssistantTalk.jsx';

export default {
    title: 'AssistantTalk',
    component: AssistantTalk,
    argTypes: {
        talkTitle: { control: 'text' },
    },
};

const quotes = [{
    voiceTitle: 'Greeting',
    voiceText: 'Doctor, you know how busy your schedule is today, yes?'
}, {
    voiceTitle: 'Talk 1',
    voiceText: 'I once ran into the Saintess at the foot of the mountain, where she stuffed a book into my hands. She told me that, if I\'m bored, I might as well try copying some scripture. I heeded her suggestion and copied a passage every day. At first, I did it just to pass the time, but then I realized it helps me to relax a little too. I find it intriguing.'
}];

export const Default = args =>
    <AssistantContext.Provider value={{ ...args }}>
        <AssistantTalk />
    </AssistantContext.Provider>

export const Greeting = args =>
    <AssistantContext.Provider value={{
        talkTitle: 'Greeting',
        ...args
    }}>
        <AssistantTalk quotes={quotes}/>
    </AssistantContext.Provider>

export const Talk1 = args =>
    <AssistantContext.Provider value={{
        talkTitle: 'Talk 1',
        ...args
    }}>
        <AssistantTalk quotes={quotes}/>
    </AssistantContext.Provider>
