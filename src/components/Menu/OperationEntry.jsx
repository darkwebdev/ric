import { Link } from 'wouter';
import { StoryTypeKeys } from '../../const';

export const OperationEntry = ({ op, opSize, storyType, isAfterStory, storyPath }) => {
    const tag = () => {
        if (storyType === StoryTypeKeys.Vignette) {
            return 'Read';
        }
        return op.avgTag?.replace(' Operation', '');
    };

    const opSizeElement = !opSize ? null : <> [<span className="op-time">{opSize.minutes} min</span>]</>;

    return <li className={`op${isAfterStory ? ' after-op' : ''}`}>
        <Link to={`story/${storyPath}`}>
            <span className="op-tag">
                ▶ {tag()}{opSizeElement}
            </span>
        </Link>
        {!isAfterStory &&
            <div className="op-title">
                <span className="op-code">{op.storyCode}</span>
                <span className="op-name">{op.storyName}</span>
            </div>
        }
    </li>;
}
