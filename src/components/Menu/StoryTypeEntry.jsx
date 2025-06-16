import iconActivity from '../../img/icon_activity.png';
import iconMainTheme from '../../img/icon_maintheme.png';
import iconSideStory from '../../img/icon_sidestory.png';
import iconIntermezzi from '../../img/icon_intermezzi.png';
import iconSpecOps from '../../img/icon_specops.png';
import iconIntStrat from '../../img/icon_is.png';
import { StoryTypeNames } from '../../const.js';

const StoryTypeIcons = {
    record: iconActivity,
    main: iconMainTheme,
    side: iconSideStory,
    intermezzi: iconIntermezzi,
    mini: iconSpecOps,
    module: iconActivity,
    rogue: iconIntStrat,
}

export const StoryTypeEntry = ({ id, isActive, onClick }) =>
    <li className={isActive ? 'active' : undefined}>
        <button className="story-type-button" onClick={onClick}>
            <img className="story-type-icon" src={StoryTypeIcons[id]} alt="" role="presentation"/>
            <span className="story-type-name">{StoryTypeNames[id]}</span>
        </button>
    </li>
