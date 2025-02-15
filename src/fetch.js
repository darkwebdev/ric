import { AssetSrc, DataSrcEn } from './const.js';

export async function loadStoryData() {
    console.log('Loading story data...');
    try {
        // const operatorData = await get_char_table(false, serverString);
        // const charCodeMap = Object.fromEntries(Object.keys(operatorData).map(key => [key.split('_')[2], key]));
        // const soundMap = await fetchData(`${DATA_BASE[serverString]}/gamedata/story/story_variables.json`);
        // const moduleStory = await fetchData(`${DataSrcEn}/gamedata/excel/uniequip_table.json`);
        // const storyTable = await fetchData(`${DataSrcEn}/gamedata/excel/story_table.json`);
        // const storyReviewMeta = await fetchData(`${DataSrcEn}/gamedata/excel/story_review_meta_table.json`);
        // const storyReview = await fetchData(`${DataSrcEn}/gamedata/excel/story_review_table.json`);
        const [moduleStory, storyTable, storyReviewMeta, storyReview] = await Promise.all([
            fetchData(`${DataSrcEn}/gamedata/excel/uniequip_table.json`),
            fetchData(`${DataSrcEn}/gamedata/excel/story_table.json`),
            fetchData(`${DataSrcEn}/gamedata/excel/story_review_meta_table.json`),
            fetchData(`${DataSrcEn}/gamedata/excel/story_review_table.json`),
        ]);

        const storyData = { moduleStory, storyTable, storyReviewMeta, storyReview };
        console.log('Story data loaded', storyData);

        return storyData;
    } catch (e) {
        console.error('Failed to load story data', e);
    }
}

export async function loadStoryText(key) {
    console.log('Loading story text...');
    const res = await fetch(`${DataSrcEn}/gamedata/story/${key}.txt`);
    console.log('Story text loaded.');

    return res.ok ? res.text() : null;
}


async function fetchData(url) {
    const res = await fetch(url);
    return res.json();
}

export function imageSrc(imageName, source) {
    switch (source) {
        case AssetSrc.aceship:
            return `${source}avg/images/${imageName}.png`;
        case AssetSrc.arkwaifu:
            return source.replace(/REPLACEME/, imageName);
        case AssetSrc.fexli:
            return `${source}/avgs/${imageName}.png`;
        default:
            return `${AssetSrc.akgcc}torappu/dynamicassets/avg/images/${imageName}.png`.toLowerCase();
    }
}

export function backgroundSrc(imageName, source) {
    switch (source) {
        case AssetSrc.aceship:
            return `${source}avg/backgrounds/${imageName}.png`;
        case AssetSrc.arkwaifu:
            return source.replace(/REPLACEME/, imageName);
        case AssetSrc.fexli:
            return `${source}/avgs/bg/${imageName}.png`;
        default:
            return `${AssetSrc.akgcc}torappu/dynamicassets/avg/backgrounds/${imageName}.png`.toLowerCase();
    }
}

export function avatarImageSrc(charId, source) {
    switch (source) {
        case AssetSrc.aceship:
            return `${source}avatars/${charId}.png`;
        case AssetSrc.fexli:
            return `${source}/avatar/ASSISTANT/${charId}.png`;
        default:
            return `${AssetSrc.akgcc}torappu/dynamicassets/arts/charavatars/${charId}.png`.toLowerCase();
    }
}

export function charImageSrc(imageName, source) {
    const { id, face, body } = destructure(imageName);
    const faceAndBody = encodeURIComponent(`#${face}$${body}`);

    switch (source) {
        case AssetSrc.aceship:
            return `${source}avg/characters/${id}${faceAndBody}.png`;
        case AssetSrc.arkwaifu:
            return source.replace(/REPLACEME/, `${id}${faceAndBody}`);
        case AssetSrc.fexli:
            return `${source}/charpack/${id}${faceAndBody}.png`;
        default:
            return `${AssetSrc.akgcc}avg/characters/${id}${faceAndBody}.png`.toLowerCase();
    }
}

function destructure(name) {
    const [_, id, face='1', body='1'] = name.match(/^([^#^$]+)(?:#(\d+))?(?:\$(\d+))?$/);
    return {
        id,
        face: face.replace(/^0+/, ''),
        body: body.replace(/^0+/, ''),
    };
}
