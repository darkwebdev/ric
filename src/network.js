import { AssetSrc, DataSrcEn, Rarities } from './const.js';

export async function storyLoader(path) {
    console.log('Loading story text...', path);
    const res = await fetch(`${DataSrcEn}/gamedata/story/${path}.txt`);
    console.log('Story text loaded.');

    if (!res.ok) return null;

    return res.text().then(text => {
        console.log('Story loaded:', text);
        return text;
    });
}

export async function loadStoryData() {
    console.log('Loading story data...');
    try {
        // const storyVariables = await fetchData(`${DATA_BASE[serverString]}/gamedata/story/story_variables.json`);
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

export async function fetchOperators() {
    // patch characters added and renamed (only guardmiya for now)
    // converts internal profession names to in-game ones

    console.log('Loading operators...');
    try {
        // meta_data = parseJson(await fetch(`${DataSrcEn}/gamedata/excel/display_meta_table_json`)),
        // audio_data = parseJson(await fetch(`${DataSrcEn}/gamedata/excel/audio_data.json`)),
        // const storyVariables = await fetchData(`${DATA_BASE[serverString]}/gamedata/story/story_variables.json`);
        const [json, patch, skins, quotes] = await Promise.all([
            parseJson(await fetch(`${DataSrcEn}/gamedata/excel/character_table.json`)),
            parseJson(await fetch(`${DataSrcEn}/gamedata/excel/char_patch_table.json`)),
            parseJson(await fetch(`${DataSrcEn}/gamedata/excel/skin_table.json`)),
            parseJson(await fetch(`${DataSrcEn}/gamedata/excel/charword_table.json`)),
        ]);

    // let json = await parseJson(await fetch(`${DataSrcEn}/gamedata/excel/character_table.json`));
    // let patch = await parseJson(await fetch(`${DataSrcEn}/gamedata/excel/char_patch_table.json`));
    //     updateJSON(json, patch.patchChars);

        // Object.keys(json).forEach((op) => {
        //     json[op].profession =
        //         ClassNames[json[op].profession] || json[op].profession;
        //     // rename amiya forms to prevent conflict
        //     if (op.includes("_amiya"))
        //         json[op].name = `${json[op].name} (${json[op].profession})`;
        // });
        // for (var key in json) {
        //         charIdMap[json[key].name] = key;
        //         if (json[key].appellation) charIdMap[json[key].appellation] = key;
        //         json[key].charId = key;
        //         // remap "rarity" field (AK 2.0)
        //         json[key].rarity = RARITY_MAP[json[key].rarity] ?? json[key].rarity;
        // }
        // for (const [k, v] of Object.entries(CN_ID_MAP)) {
        //     if (!(k in charIdMap)) charIdMap[k] = charIdMap[v];
        // }


        const sortedOps = Object.entries(json)
            .filter(withDisplayNumber)
            .sort(byRarity);

        console.log('Operators loaded:', json, skins.charSkins, quotes, sortedOps);

        return sortedOps.map(([charId, op]) => ({
            ...op,
            charId,
            skins: Object.values(skins.charSkins).filter(skin => skin.charId === charId),
            quotes: Object.values(quotes.charWords).filter(quote => quote.charId === charId),
        }));
    } catch (e) {
        console.error('Failed to load story data', e);
    }
}


function withDisplayNumber([charId, op]) {
    return op.displayNumber !== null;
}

function byRarity([charId1, op1], [charId2, op2]) {
    const rarity1 = Rarities.indexOf(op1.rarity);
    const rarity2 = Rarities.indexOf(op2.rarity);
    if (rarity1 === rarity2) {
        return op1.name.localeCompare(op2.name);
    }
    return rarity2 - rarity1;

}

async function parseJson(res) {
    const parseWithoutTrailingComma = txt => JSON.parse(txt.replace(/,(\W+}\W*$)/, "$1"));
    return res.clone().json().catch(_ => res.text().then(parseWithoutTrailingComma));
}

function updateJSON(dest, src, existingOnly = false) {
    for (let key in src) {
        if (typeof dest[key] == "object" && typeof src[key] == "object")
            dest[key] = updateJSON(dest[key], src[key], existingOnly);
        else if (!existingOnly || key in dest) dest[key] = src[key];
    }
    return dest;
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

export function preloadImages(images) {
    return Promise
        .all(images.map(cacheImage))
        .then(() => {
            console.log('Images preloaded successfully.');
        })
        .catch(e => {
            console.error('Failed to preload images', e);
        });
}

// function preloadImage(src) {
//     return new Promise((resolve, reject) => {
//         const image = new Image();
//         image.onload = resolve;
//         image.onerror = reject;
//         image.src = src;
//     });
// }

function imagesFromScene(line) {
    switch (line.fn) {
        case 'Character':
            return line.name && [charImageSrc(line.name), line.name2 && charImageSrc(line.name2)];
        case 'Image':
            return line.image && imageSrc(line.image);
        case 'Background':
            return line.image && backgroundSrc(line.image);
    }
}

export function imagesFromScenes(scenes) {
    return Array.from(new Set(scenes.flatMap(scene => scene.flatMap(imagesFromScene).filter(Boolean))));
}

async function cacheImage(src) {
    const cache = await caches.open('images');

    const isImageCached = await cache.match(src);

    if (isImageCached) {
        // console.log('Image already cached', src);
        return;
    }

    const response = await fetch(src);

    await cache.put(src, response);
}

export const checkCacheUsage = event => {
    const imgSrc = event.target.src;
    const resourceEntries = performance.getEntriesByType('resource');
    const resource = resourceEntries.find(entry => entry.name === imgSrc);
    console.log('Image loaded', imgSrc, resource);

    if (resource) {
        if (resource.transferSize === 0) {
            console.log('Image loaded from cache', imgSrc);
        } else {
            console.log('Image fetched from network', imgSrc);
        }
    }
};

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

export function charArtSrc(imageName, source) {
    switch (source) {
        case AssetSrc.aceship:
            return `${source}avg/characters/${id}${faceAndBody}.png`;
        case AssetSrc.arkwaifu:
            return source.replace(/REPLACEME/, `${id}${faceAndBody}`);
        case AssetSrc.fexli:
        default:
            return `${AssetSrc.fexli}/charpack/${imageName.replace('#', '_')}.png`;
    }
}

function destructure(name) {
    // eslint-disable-next-line no-unused-vars
    const [_, id, face='1', body='1'] = name.match(/^([^#^$]+)(?:#(\d+))?(?:\$(\d+))?$/);
    return {
        id,
        face: face.replace(/^0+/, ''),
        body: body.replace(/^0+/, ''),
    };
}
