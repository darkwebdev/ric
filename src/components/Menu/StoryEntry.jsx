export const StoryEntry = ({ isActive, onClick, name }) =>
    <li className={isActive ? 'active' : undefined}>
        <button className="story-button" onClick={onClick}>
            {name}
        </button>
    </li>
