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

export function operationByPath(storyData, storyId, operationPath) {
    return storyData.storyReview[storyId].infoUnlockDatas.find(op => op.storyTxt === operationPath) ||
      storyData.storyReview[storyId].infoUnlockDatas[0];
}

export function nextOperationByPath(storyData, storyId, operationPath) {
    const datas = storyData.storyReview[storyId].infoUnlockDatas;
    const index = datas.findIndex(op => op.storyTxt === operationPath);
    return index >= 0 ? datas[index + 1] : undefined;
}

export function storyNameById(storyData, storyId) {
    return storyData.storyReview[storyId].name;
}

export function operationsByStoryId(storyData, storyId) {
    return storyData.storyReview[storyId].infoUnlockDatas;
}
