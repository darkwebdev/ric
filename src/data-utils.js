import { IntermezziIds, StoryTypeNames } from './const.js';

export function categorizeStories({ storyReview, storyReviewMeta, moduleStory, storyTable }) {
    const storyTypes = Object.fromEntries(Object.keys(StoryTypeNames).map(key => [key, []]));

    Object.values(storyReview).forEach(x => {
        const components = storyReviewMeta?.actArchiveData?.components;
        if (components && x.id in components) {
            Object.values(components[x.id]?.avg?.avgs || {})
                .sort((a, b) => (a?.avgSortId || 0) - (b?.avgSortId || 0))
                .map(x => x?.avgId)
                .forEach(avgid => {
                    x.infoUnlockDatas.push({
                        storyGroup: x.id,
                        storyInfo: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.breifPath,
                        storyTxt: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.contentPath,
                        storyCode: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.desc,
                        storyName: storyReviewMeta?.actArchiveResData?.avgs[avgid]?.desc,
                        avgTag: '',
                    });
                });
        }
        if (x.id.startsWith('main_')) {
            const storytxt = x.infoUnlockDatas[0].storyTxt.replace(/[^/]+$/, `${x.id}_zone_enter`);
            if (storyTable[storytxt]) {
                x.infoUnlockDatas.unshift({
                    storyGroup: x.id,
                    storyInfo: x.infoUnlockDatas[0].storyInfo.replace(/[^/]+$/, `${x.id}_zone_enter`),
                    storyTxt: storytxt,
                    storyCode: 'Introduction',
                    storyName: 'Introduction',
                    avgTag: '',
                });
            }
        }
        if (x.id.startsWith('main_')) {
            storyTypes.main.push(x.id);
        } else if (x.id.startsWith('story_')) {
            storyTypes.record.push(x.id);
        } else if (x.entryType.startsWith('MINI_')) {
            storyTypes.mini.push(x.id);
        } else if (IntermezziIds.includes(x.id)) {
            storyTypes.intermezzi.push(x.id);
        } else {
            storyTypes.side.push(x.id);
        }
    });

    // storyTypes.module = [].concat(...Object.values(moduleStory.charEquip).map(x => x.slice(1)))
    //     .filter(x => operatorData[moduleStory.equipDict[x].charId]);
    storyTypes.module.forEach(x => {
        storyReview[x] = {
            infoUnlockDatas: [{ storyName: moduleStory.equipDict[x].uniEquipName, storyTxt: x }],
        };
    });

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
