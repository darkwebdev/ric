import { useEffect, useState } from 'react';
import {
    categorizeStories,
    operationById,
    operationsByStoryId,
} from '../../data-utils.js';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { loadStoryData, checkForDataUpdates } from '../../network.js';
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
    const [forceReload, setForceReload] = useState(0); // Used to force re-render after data update

    useEffect(() => {
        (async () => {
            // Check for data updates first
            const dataUpdated = await checkForDataUpdates();
            
            if (dataUpdated) {
                // Force a re-render by updating the forceReload state
                // This will cause the useLocalStorage hook to re-read from localStorage
                setForceReload(prev => prev + 1);
                return; // Exit early, the effect will run again due to forceReload change
            }
            
            const data = storedStoryData || await loadStoryData();
            if (data) {
                console.log('Metadata loaded', storedStoryData ? 'from local storage.' : 'from network.', dataUpdated ? '(updated)' : '');
                setStoryData(data);
                if (!storedStoryData) {
                    storeStoryData(data);
                }
                const categorized = categorizeStories(data);
                if (categorized) {
                    setStoryTypeIds(categorized);
                }
            }
            onLoad();
        })()
    }, [storedStoryData, storeStoryData, forceReload, onLoad]);

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
                        <StoryEntry
                            key={id}
                            id={id}
                            storyType={storyType}
                            storyData={storyData}
                            isActive={id === storyId}
                            onClick={() => setStoryId(id)}
                        />
                    )}
                </ul>
                {storyId !== undefined &&
                    <ul className="operations">
                        {operationsByStoryId(storyData, storyId).map((op, i, ops) =>
                            <OperationEntry
                                key={op.storyId}
                                op={op}
                                opSize={storyData.storySize[op.storyTxt]}
                                isAfterStory={op.storyCode && op.storyCode === ops[i - 1]?.storyCode}
                                storyPath={operationById(storyData, storyId, op.storyId).storyTxt}
                            />
                        )}
                    </ul>
                }
            </div>
        }
    </>;
};
