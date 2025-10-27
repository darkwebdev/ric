import { DataSrcCn, DataSrcEn, Rarities } from './const.js';
import { backgroundSrc, charImageSrc, imageSrc } from './asset-sources';
import readingTimeData from '../data/reading-time.json';

// Local cache base (committed by daily GitHub Action)
const appBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/';
const LocalDataBase = `${appBase}data/remote`;

function localizeUrl(url) {
  if (url.startsWith(DataSrcEn)) return `${LocalDataBase}/en_US${url.slice(DataSrcEn.length)}`;
  if (url.startsWith(DataSrcCn)) return `${LocalDataBase}/zh_CN${url.slice(DataSrcCn.length)}`;
  return url;
}

async function fetchPreferLocal(url, opts) {
  const localUrl = localizeUrl(url);
  try {
    const res = await fetch(localUrl, opts);
    if (res && res.ok) return res;
  } catch (e) {
    // ignore and fallback
  }
  return fetch(url, opts);
}

export async function storyLoader(path) {
  console.log('Loading story text...', path);
  const res = await fetchPreferLocal(`${DataSrcEn}/gamedata/story/${path}.txt`);
  console.log('Story text loaded.');

  if (!res.ok) return null;

  return res.text().then(text => {
    console.log('Story loaded:', text);
    return text;
  });
}

// Check if remote data has been updated and clear localStorage if needed
export async function checkForDataUpdates() {
  try {
    const versionUrl = `${LocalDataBase}/version.json`;
    const res = await fetch(versionUrl);
    
    if (!res.ok) {
      console.log('No version file found, skipping update check');
      return false;
    }
    
    const remoteVersion = await res.json();
    const storedVersion = localStorage.getItem('storyDataVersion');
    
    if (!storedVersion || parseInt(storedVersion) < remoteVersion.version) {
      console.log('New story data available, clearing localStorage cache');
      localStorage.removeItem('storyData');
      localStorage.setItem('storyDataVersion', remoteVersion.version.toString());
      return true; // Data was updated
    }
    
    return false; // No update needed
  } catch (e) {
    console.log('Failed to check for data updates:', e);
    return false;
  }
}

function minimalStoryData({ moduleStory, storyTable, storyReviewMeta, storyReview, storyVariables, storySize }) {
  return {
    moduleStory: {
      charEquip: moduleStory.charEquip,
      equipDict: Object.fromEntries(Object.values(moduleStory.equipDict).map(({ uniEquipId, uniEquipName }) =>
        ([ uniEquipId, { uniEquipId, uniEquipName } ]))
      ),
    },
    storyTable: Object.keys(storyTable),
    storyReviewMeta: {
      actArchiveResData: storyReviewMeta.actArchiveResData,
      actArchiveData: storyReviewMeta.actArchiveData,
      miniActTrialData: storyReviewMeta.miniActTrialData,
    },
    storyReview: Object.fromEntries(Object.values(storyReview).map(({ id, name, entryType, infoUnlockDatas }) =>
      ([ id, { id, name, entryType, infoUnlockDatas, } ]))
    ),
    storyVariables,
    storySize,
  };
}

export async function loadStoryData() {
  console.log('Loading stories metadata...');
  try {
    const [moduleStory, storyTable, storyReviewMeta, storyReview, storyVariables] = await Promise.all([
      fetchData(`${DataSrcEn}/gamedata/excel/uniequip_table.json`),
      fetchData(`${DataSrcEn}/gamedata/excel/story_table.json`),
      fetchData(`${DataSrcEn}/gamedata/excel/story_review_meta_table.json`),
      fetchData(`${DataSrcEn}/gamedata/excel/story_review_table.json`),
      fetchData(`${DataSrcEn}/gamedata/story/story_variables.json`),
    ]);

    const storyData = minimalStoryData({ moduleStory, storyTable, storyReviewMeta, storyReview, storyVariables, storySize: readingTimeData });
    console.log('Story data loaded', storyData);

    return storyData;
  } catch (e) {
    console.error('Failed to load story data', e);
  }
}

export async function fetchOperators({ source = DataSrcCn } = {}) {
  // patch characters added and renamed (only guardmiya for now)
  // converts internal profession names to in-game ones

  console.log('Loading operators...');
  try {
    // meta_data = parseJson(await fetch(`${DataSrcEn}/gamedata/excel/display_meta_table_json`)),
    // audio_data = parseJson(await fetch(`${DataSrcEn}/gamedata/excel/audio_data.json`)),
    // const storyVariables = await fetchData(`${DATA_BASE[serverString]}/gamedata/story/story_variables.json`);
    // eslint-disable-next-line no-unused-vars
    const [json, /*patch,*/ skinsEn, skinsFull, quotes] = await Promise.all([
      parseJson(await fetchPreferLocal(`${source}/gamedata/excel/character_table.json`)),
      // parseJson(await fetch(`${source}/gamedata/excel/char_patch_table.json`)),
      parseJson(await fetchPreferLocal(`${DataSrcEn}/gamedata/excel/skin_table.json`)),
      parseJson(await fetchPreferLocal(`${DataSrcCn}/gamedata/excel/skin_table.json`)),
      parseJson(await fetchPreferLocal(`${DataSrcEn}/gamedata/excel/charword_table.json`)),
    ]);

    // console.log('Operators loaded:', json, skinsFull.charSkins, skinsEn.charSkins, quotes.charWords);

    const mergedSkins = charId =>
      Object.values(skinsFull.charSkins)
        .filter(skin => skin.charId === charId)
        .map(skin => {
          const skinEn = Object.values(skinsEn.charSkins).find(({ skinId }) => skinId === skin.skinId);
          return ({
            ...skin,
            displaySkin: skinEn?.displaySkin || skin.displaySkin,
          });
        });

    return Object.entries(json)
      .filter(withDisplayNumber)
      .map(([charId, op]) => {
        return ({
          ...op,
          name: op.appellation === ' ' ? op.name : op.appellation,
          charId,
          skins: mergedSkins(charId),
          quotes: Object.values(quotes.charWords).filter(quote => quote.charId === charId),
        });
      })
      .sort(byRarityAndName);
  } catch (e) {
    console.error('Failed to load story data', e);
  }
}


// eslint-disable-next-line no-unused-vars
function withDisplayNumber([charId, op]) {
  return op.displayNumber !== null;
}

function byRarityAndName(op1, op2) {
  const rarity1 = Rarities.indexOf(op1.rarity);
  const rarity2 = Rarities.indexOf(op2.rarity);
  if (rarity1 === rarity2) {
    return op1.name.localeCompare(op2.name);
  }
  return rarity2 - rarity1;

}

async function parseJson(res) {
  const parseWithoutTrailingComma = txt => JSON.parse(txt.replace(/,(\W+}\W*$)/, '$1'));

  return res.clone().json().catch(_ => res.text().then(parseWithoutTrailingComma));
}

function updateJSON(dest, src, existingOnly = false) {
  for (let key in src) {
    if (typeof dest[key] == 'object' && typeof src[key] == 'object')
      dest[key] = updateJSON(dest[key], src[key], existingOnly);
    else if (!existingOnly || key in dest) dest[key] = src[key];
  }
  return dest;
}

export async function loadStoryText(key) {
  console.log('Loading story text...');
  const res = await fetchPreferLocal(`${DataSrcEn}/gamedata/story/${key}.txt`);
  console.log('Story text loaded.');

  return res.ok ? res.text() : null;
}


async function fetchData(url) {
  const res = await fetchPreferLocal(url);
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
