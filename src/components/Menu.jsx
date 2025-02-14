import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { StoryTypeNames } from '../const.js';
import { categorizeStories, operationById, operationsByStoryId, storyNameById } from '../data-utils.js';
import iconMainTheme from '../img/icon_maintheme.png';
import iconSideStory from '../img/icon_sidestory.png';
import iconIntermezzi from '../img/icon_intermezzi.png';
import iconIntStrat from '../img/icon_is.png';
import iconSpecOps from '../img/icon_specops.png';
import iconActivity from '../img/icon_activity.png';
import { loadStoryData } from '../fetch.js';

const StoryTypeIcons = {
    record: iconActivity,
    main: iconMainTheme,
    side: iconSideStory,
    intermezzi: iconIntermezzi,
    mini: iconSpecOps,
    module: iconActivity,
    rogue: iconIntStrat,
}

export const Menu = () => {
    const [storyData, setStoryData] = useState();
    const [storyType, setStoryType] = useState();
    const [storyTypeIds, setStoryTypeIds] = useState();
    const [storyId, setStoryId] = useState();

    useEffect(() => {
        console.log('Loading metadata...');
        (async () => {
            setStoryData(await loadStoryData());
            console.log('Metadata loaded.');
        })()
    }, []);

    useEffect(() => {
        if (storyData) {
            const categorized = categorizeStories(storyData);
            if (categorized) {
                setStoryTypeIds(categorized);
            }
        }
    }, [storyData]);

    const updateStoryType = type => {
        setStoryType(type);
        setStoryId(undefined);
    }

    return (
        storyTypeIds && <>
            <ul className="story-types" aria-label="Story types">
                {Object.keys(storyTypeIds).map(id =>
                    <li key={id} className={id === storyType ? 'active' : undefined}>
                        <button className="story-type-button" onClick={() => updateStoryType(id)}>
                            <img className="story-type-icon" src={StoryTypeIcons[id]} alt="" role="presentation" />
                            <span className="story-type-name">{StoryTypeNames[id]}</span>
                        </button>
                    </li>
                )}
            </ul>

            {storyType && storyTypeIds[storyType].length > 0 && <div className="story-menu">
                <ul className="stories" aria-label="Stories">
                    {storyTypeIds[storyType].map(id =>
                        <li key={id} className={id === storyId ? 'active' : undefined}>
                            <button className="story-button" onClick={() => setStoryId(id)}>
                                {storyNameById(storyData, id)}
                            </button>
                        </li>
                    )}
                </ul>
                {storyId !== undefined && <ul className="operations">
                    {operationsByStoryId(storyData, storyId).map(op =>
                        <li key={op.storyId}>
                            <Link to={`story/${operationById(storyData, storyId, op.storyId).storyTxt}`}>
                                <span className="op-code">{op.storyCode}</span> {op.storyName} [{op.avgTag}]
                            </Link>
                        </li>
                    )}
                </ul>}
            </div>}
        </>
    );
};
