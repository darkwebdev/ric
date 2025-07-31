import { StoryTypeKeys } from '../../const';
import { operatorByVignette, storyNameById } from '../../data-utils';

export const StoryEntry = ({ isActive, onClick, id, storyData, storyType }) => {
    const name = storyNameById(storyData, id);
    const operator = storyType === StoryTypeKeys.Vignette && operatorByVignette(storyData, id);

    return name && <li className={isActive ? 'active' : undefined}>
        <button className="story-button" onClick={onClick}>
            {name}
            {operator && <span className="op-operator">({operator})</span>}
        </button>
    </li>;
}
