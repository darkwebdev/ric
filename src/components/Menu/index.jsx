import { useEffect, useState } from 'react';
import { categorizeStories, operationById, operationsByStoryId, storyNameById } from '../../data-utils.js';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { loadStoryData } from '../../network.js';
import { StoryTypeEntry } from './StoryTypeEntry.jsx';
import { StoryEntry } from './StoryEntry.jsx';
import { OperationEntry } from './OperationEntry.jsx';
import './style.css';

export const Menu = ({ opened, onLoad = () => {}, onOpen = () => {} }) => {
    const [storyData, setStoryData] = useState();
    const [storyType, setStoryType] = useState();
    const [storyTypeIds, setStoryTypeIds] = useState();
    const [storyId, setStoryId] = useState();
    const [storedStoryData, storeStoryData] = useLocalStorage('storyData');

    useEffect(() => {
        (async () => {
            const data = storedStoryData || await loadStoryData();
            if (data) {
                console.log('Metadata loaded ', storedStoryData ? 'from local storage.' : 'from network.');
                setStoryData(data);
                if (!storedStoryData) {
                    console.log('Storing story data in local storage...');
                    storeStoryData(data);
                }
                const categorized = categorizeStories(data);
                if (categorized) {
                    setStoryTypeIds(categorized);
                }
            }
            onLoad();
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
                <StoryTypeEntry key={id} id={id}
                    isActive={opened && id === storyType}
                    onClick={() => updateStoryType(id)}
                />
            )}
        </ul>

        {opened && storyType && storyTypeIds[storyType].length > 0 &&
            <div className="story-menu" key={storyType}>
                <ul className="stories" aria-label="Stories">
                    {storyTypeIds[storyType].map(id =>
                        <StoryEntry key={id}
                            name={storyNameById(storyData, id)}
                            isActive={id === storyId}
                            onClick={() => setStoryId(id)}
                        />
                    )}
                </ul>
                {storyId !== undefined &&
                    <ul className="operations">
                        {operationsByStoryId(storyData, storyId).map((op, i, ops) =>
                            <OperationEntry key={op.storyId} op={op}
                                isAfterStory={op.storyCode === ops[i - 1]?.storyCode}
                                storyPath={operationById(storyData, storyId, op.storyId).storyTxt}
                            />
                        )}
                    </ul>
                }
            </div>
        }
    </>;
};
