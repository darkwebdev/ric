import { Carousel } from 'react-responsive-carousel';
import { Link } from 'wouter';
import { SceneBackground, SceneForeground } from '../Scene';
import { Progress } from '../Progress';

import 'react-responsive-carousel/lib/styles/carousel.css';
import './style.css';

export const StorySlider = ({
    scenes,
    sceneIndex,
    delayCountdown,
    onClick = () => {},
    onChange = () => {},
    isDebug = false,
}) => {
    const statusFormatter = (current, total) =>
        <Progress value={current} max={total} text={isDebug && delayCountdown && `delay: ${delayCountdown}`} />;

    return scenes && <>
        <div className="scene-background">
            <SceneBackground scene={scenes[sceneIndex]} />
        </div>
        <Carousel
            autoFocus={true}
            useKeyboardArrows={true}
            showArrows={false}
            showStatus={true}
            showIndicators={true}
            showThumbs={false}
            transitionTime={1000}
            animationHandler='fade'
            swipeable={false}
            selectedItem={sceneIndex}
            onClickItem={e => {console.log('CLICK'); onClick(e);}}
            onChange={onChange}
            statusFormatter={statusFormatter}
            renderIndicator={isDebug && renderIndicator(scenes)}
        >
            {scenes.map((scene, index) =>
                <SceneForeground scene={scene} index={index} key={index} />
            )}
        </Carousel>
    </>;
}

function renderIndicator(scenes) {
    return (onClickHandler, isSelected, index) => (
        <li value={index} key={index} className={isSelected ? 'active' : ''}>
            <Link to={`?scene=${index}&debug`} onClick={onClickHandler}>
                {scenes[index].map((line, li) =>
                    <DebugLine line={line} key={`${index}-${line.fn}-${li}`} />
                )}
            </Link>
        </li>
    );
}

function DebugLine({ line }) {
    const { fn, ...rest } = line;

    return <div>{fn}: {JSON.stringify(rest)}</div>;
}
