import { IntermezziIds, StoryTypeNames } from './const.js';

export function categorizeStories({ storyReview, storyReviewMeta, moduleStory, storyTable }) {
    const storyTypes = Object.fromEntries(Object.keys(StoryTypeNames).map(key => [key, []]));

    Object.values(storyReview).forEach(story => {
        const components = storyReviewMeta?.actArchiveData?.components;
        if (components && story.id in components) {
            Object.values(components[story.id]?.avg?.avgs || {})
                .sort((a, b) => (a?.avgSortId || 0) - (b?.avgSortId || 0))
                .map(x => x?.avgId)
                .forEach(avgid => {
                    story.infoUnlockDatas.push({
                        storyGroup: story.id,
                        storyInfo: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.breifPath,
                        storyTxt: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.contentPath,
                        storyCode: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.desc,
                        storyName: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.desc,
                        avgTag: '',
                    });
                });
        }
        if (story.id.startsWith('main_')) {
            const storytxt = story.infoUnlockDatas[0].storyTxt.replace(/[^/]+$/, `${story.id}_zone_enter`);
            if (storyTable[storytxt]) {
                story.infoUnlockDatas.unshift({
                    storyGroup: story.id,
                    storyInfo: story.infoUnlockDatas[0].storyInfo.replace(/[^/]+$/, `${story.id}_zone_enter`),
                    storyTxt: storytxt,
                    storyCode: 'Introduction',
                    storyName: 'Introduction',
                    avgTag: '',
                });
            }
        }
        if (story.id.startsWith('main_')) {
            storyTypes.main.push(story.id);
        } else if (story.id.startsWith('story_')) {
            storyTypes.record.push(story.id);
        } else if (story.entryType.startsWith('MINI_')) {
            storyTypes.mini.push(story.id);
        } else if (IntermezziIds.includes(story.id)) {
            storyTypes.intermezzi.push(story.id);
        } else {
            storyTypes.side.push(story.id);
        }
    });

    Object.values(moduleStory.charEquip)
        .flatMap(story => story.slice(1))
        // .filter(story => operatorData[moduleStory.equipDict[story].charId])
        .forEach(story => {
            storyTypes.module.push(story);
        })
    storyTypes.module.forEach(story => {
        storyReview[story] = {
            name: moduleStory.equipDict[story].uniEquipName,
            infoUnlockDatas: [{
                storyName: moduleStory.equipDict[story].uniEquipName,
                storyTxt: story
            }],
        };
    });
    // todo: group modules by operators

    return storyTypes;
}


export function operationById(storyData, storyId, operationId) {
    return storyData.storyReview[storyId].infoUnlockDatas.find(op => op.storyId === operationId);
}

export function storyNameById(storyData, storyId) {
    return storyData.storyReview[storyId].name;
}

export function storyReadingStats(storyData, storyId) {
    const infos = storyData.storyReview[storyId]?.infoUnlockDatas;
    if (!infos || !infos.length) {
        console.error(`No 'infoUnlockDatas' for storyId=${storyId}`);
        return;
    }

    const sizes = storyData.storySize || {};

    return infos.reduce((acc, { storyTxt }) => {
        if (!acc || !storyTxt) return acc;

        const size = sizes[storyTxt];
        if (size) {
            acc.words += size.words;
            acc.minutes += size.minutes;
            return acc;
        } else {
            console.warn(`No reading-time entry for ${storyTxt}`);
            return acc;
        }
    }, {
        words: 0,
        minutes: 0,
    });
}

export function storyByPath(storyData, operationPath) {
    return Object.values(storyData.storyReview).find(({ infoUnlockDatas }) =>
      infoUnlockDatas.some(({ storyTxt }) => storyTxt === operationPath)
    )
}

export function operationsByStoryId(storyData, storyId) {
    return storyData.storyReview[storyId].infoUnlockDatas;
}

export function operatorByVignette(storyData, storyId) {
    const miniActTrialDataMap = storyData?.storyReviewMeta?.miniActTrialData?.miniActTrialDataMap || {};
    const rewardList = miniActTrialDataMap[storyId]?.rewardList || [];
    return rewardList.find(({ item }) => item.type === 'CHAR')?.item?.id;
}
