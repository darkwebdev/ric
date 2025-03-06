import { useState } from 'react';
import { TalkTitles } from '../../const.js';

export const useAssistantTalk = () => {
    const [talkTitle, setTalkTitle] = useState(TalkTitles[0]);

    const nextTalkTitle = () => {
        setTalkTitle(TalkTitles[TalkTitles.indexOf(talkTitle)+1] || TalkTitles[1]);
    }

    return { talkTitle, nextTalkTitle };
}
