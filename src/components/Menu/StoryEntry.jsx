import { StoryTypeKeys } from '../../const';
import { operatorByVignette, storyReadingStats, storyNameById } from '../../data-utils';

export const StoryEntry = ({ isActive, onClick, id, storyData, storyType }) => {
    const name = storyNameById(storyData, id);
    const operator = storyType === StoryTypeKeys.Vignette && operatorByVignette(storyData, id);

    const reading = storyReadingStats(storyData, id);
    const readingTime = reading && minutesToHoursMinutes(reading.minutes);

    return name && <li className={isActive ? 'active' : undefined}>
        <button className="story-button" onClick={onClick}>
            {name}{readingTime && ` [${readingTime}]`}
            {operator && <span className="op-operator">({operator})</span>}
        </button>
    </li>;
}

function minutesToHoursMinutes(minutes) {
    if (!Number.isFinite(minutes)) return '';

    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);

    return `${h}h ${m}m`;
}
