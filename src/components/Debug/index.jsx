import { Link } from 'wouter';
import './style.css';

export const Debug = ({ scenes, sceneIndex, delayCountdown }) =>
    <div className="dialog-debug">
        <div className="dialog-debug-delay">Delay: {delayCountdown ? <span>{delayCountdown}ms</span> : 'None'}</div>
        <ol className="dialog-timeline" start="0">
            {scenes.map((scene, si) =>
                <li key={si} className={`dialog-timeline-scene${si === sceneIndex ? ' active' : ''}`}>
                    {scene.map((line, li) =>
                        <Link to={`?scene=${si}`} key={`${si}-${line.fn}-${li}`}>
                            {debugLine(line)}
                        </Link>
                    )}
                </li>
            )}
        </ol>
    </div>;

function debugLine(line) {
    const { fn, ...rest } = line;

    return `${fn}: ${JSON.stringify(rest)}`;
}
