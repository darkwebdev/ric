import React, { useEffect, useState } from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { Link } from 'wouter';

import { categorizeStories, operationById, operationsByStoryId, storyNameById } from '../../data-utils.js';
import { loadStoryData } from '../../network.js';
import { StoryTypeNames } from '../../const.js';
import iconMainTheme from '../../img/icon_maintheme.png';
import iconSideStory from '../../img/icon_sidestory.png';
import iconIntermezzi from '../../img/icon_intermezzi.png';
import iconIntStrat from '../../img/icon_is.png';
import iconSpecOps from '../../img/icon_specops.png';
import iconActivity from '../../img/icon_activity.png';
import './style.css';

const StoryTypeIcons = {
    record: iconActivity,
    main: iconMainTheme,
    side: iconSideStory,
    intermezzi: iconIntermezzi,
    mini: iconSpecOps,
    module: iconActivity,
    rogue: iconIntStrat,
}

export const Menu = ({ opened, onOpen = () => {} }) => {
    const [storyData, setStoryData] = useState();
    const [storyType, setStoryType] = useState();
    const [storyTypeIds, setStoryTypeIds] = useState();
    const [storyId, setStoryId] = useState();

    useEffect(() => {
        console.log('Loading metadata...');
        (async () => {
            const data = await loadStoryData()
            if (data) {
                console.log('Metadata loaded.');
                setStoryData(data);
                const categorized = categorizeStories(data);
                if (categorized) {
                    setStoryTypeIds(categorized);
                }
            }
        })()
    }, []);

    const updateStoryType = type => {
        onOpen();
        setStoryType(type);
        setStoryId(undefined);
    }

    return storyData && storyTypeIds && <>
        <ul className="story-types" aria-label="Story types">
            {Object.keys(storyTypeIds).map(id =>
                <li key={id} className={opened && id === storyType ? 'active' : undefined}>
                    <button className="story-type-button" onClick={() => updateStoryType(id)}>
                        <img className="story-type-icon" src={StoryTypeIcons[id]} alt="" role="presentation" />
                        <span className="story-type-name">{StoryTypeNames[id]}</span>
                    </button>
                </li>
            )}
        </ul>

        {opened && storyType && storyTypeIds[storyType].length > 0 &&
            <ReactCSSTransitionReplace
                transitionName="cross-fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                <div className="story-menu" key={storyType}>
                    <ul className="stories" aria-label="Stories">
                        {storyTypeIds[storyType].map(id =>
                            <li key={id} className={id === storyId ? 'active' : undefined}>
                                <button className="story-button" onClick={() => setStoryId(id)}>
                                    {storyNameById(storyData, id)}
                                </button>
                            </li>
                        )}
                    </ul>
                    {storyId !== undefined &&
                        <ul className="operations">
                            {operationsByStoryId(storyData, storyId).map((op, i, ops) => {
                                const isAfterStory = op.storyCode === ops[i - 1]?.storyCode;
                                return (
                                    <li key={op.storyId} className={`op${isAfterStory ? ' after-op' : ''}`}>
                                        <Link to={`story/${operationById(storyData, storyId, op.storyId).storyTxt}`}>
                                            <span className="op-tag">▶ {op.avgTag.replace(' Operation', '')}</span>
                                        </Link>
                                        {!isAfterStory &&
                                            <div className="op-title">
                                                <span className="op-code">{op.storyCode}</span>
                                                <span className="op-name">{op.storyName}</span>
                                            </div>
                                        }
                                    </li>
                                )}
                            )}
                        </ul>
                    }
                </div>
            </ReactCSSTransitionReplace>
        }
    </>;
};
