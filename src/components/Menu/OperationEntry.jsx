import { Link } from 'wouter';

export const OperationEntry = ({ op, isAfterStory, storyPath }) =>
    <li className={`op${isAfterStory ? ' after-op' : ''}`}>
        <Link to={`story/${storyPath}`}>
            <span className="op-tag">▶ {op.avgTag?.replace(' Operation', '')}</span>
        </Link>
        {!isAfterStory &&
            <div className="op-title">
                <span className="op-code">{op.storyCode}</span>
                <span className="op-name">{op.storyName}</span>
            </div>
        }
    </li>
