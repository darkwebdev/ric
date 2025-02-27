import {  Carousel } from 'react-responsive-carousel';
import { Link } from 'wouter';
import { Scene } from '../Scene/index.jsx';

import 'react-responsive-carousel/lib/styles/carousel.css';
import './style.css';

export const StorySlider = ({
    scenes,
    sceneIndex,
    delayCountdown,
    onClick = () => {},
    onDelay = () => {},
    onChange = () => {}
}) => {
    return scenes &&
        <Carousel
            autoFocus={true}
            useKeyboardArrows={true}
            showArrows={true}
            showStatus={true}
            showIndicators={true}
            showThumbs={false}
            transitionTime={1000}
            animationHandler='fade'
            selectedItem={sceneIndex}
            onClickItem={(i) => {console.log('Carousel onClickItem', i);}}
            onClickThumb={(i) => {console.log('Carousel onClickThumb', i);}}
            onChange={(i) => {console.log('Carousel onChange', i); onChange(i);}}
            statusFormatter={(current, total) => `${current} / ${total}, Delay: ${delayCountdown}`}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                return (
                    <li value={index} key={index} className={isSelected && 'active'}>
                        <Link to={`?scene=${index}`} onClick={onClickHandler}>
                            {scenes[index].map((line, li) => <DebugLine line={line} key={`${index}-${line.fn}-${li}`} />)}
                        </Link>
                    </li>
                );
            }}
        >
            {scenes.map((scene, i) => {
                return <Scene
                    onClick={() => {console.log('Scene click'); onClick(); }}
                    onDelay={console.log}
                    scene={scene}
                    key={`scene-${i}`}
                />;
            })}
        </Carousel>;
}

function DebugLine({ line }) {
    const { fn, ...rest } = line;

    return <div>{fn}: {JSON.stringify(rest)}</div>;
}
