#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.resolve(__dirname, '..');
// Serve these files statically by placing them under public
const outDir = path.join(root, 'public', 'data', 'remote');

const DataSrcCn = 'https://raw.githubusercontent.com/ArknightsAssets/ArknightsGameData/master/cn';
const DataSrcEn = 'https://raw.githubusercontent.com/ArknightsAssets/ArknightsGamedata/master/en';
const urls = [
  // Prefetch core story metadata and tables
  { src: `${DataSrcEn}/gamedata/excel/uniequip_table.json`, dest: 'en_US/gamedata/excel/uniequip_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_table.json`, dest: 'en_US/gamedata/excel/story_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_meta_table.json`, dest: 'en_US/gamedata/excel/story_review_meta_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_table.json`, dest: 'en_US/gamedata/excel/story_review_table.json' },
  { src: `${DataSrcEn}/gamedata/story/story_variables.json`, dest: 'en_US/gamedata/story/story_variables.json' },
  { src: `${DataSrcEn}/gamedata/excel/uniequip_table.json`, dest: 'en_US/gamedata/excel/uniequip_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_table.json`, dest: 'en_US/gamedata/excel/story_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_meta_table.json`, dest: 'en_US/gamedata/excel/story_review_meta_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/story_review_table.json`, dest: 'en_US/gamedata/excel/story_review_table.json' },
  { src: `${DataSrcEn}/gamedata/story/story_variables.json`, dest: 'en_US/gamedata/story/story_variables.json' },
  { src: `${DataSrcEn}/gamedata/excel/skin_table.json`, dest: 'en_US/gamedata/excel/skin_table.json' },
  { src: `${DataSrcCn}/gamedata/excel/skin_table.json`, dest: 'zh_CN/gamedata/excel/skin_table.json' },
  { src: `${DataSrcEn}/gamedata/excel/charword_table.json`, dest: 'en_US/gamedata/excel/charword_table.json' },
  { src: `${DataSrcCn}/gamedata/excel/character_table.json`, dest: 'zh_CN/gamedata/excel/character_table.json' },
];

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200) return reject(new Error('Bad status ' + res.statusCode + ' for ' + url));
      mkdirp(path.dirname(dest));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    });
    req.on('error', reject);
  });
}

(async function main() {
  try {
    console.log('Saving remote data into', outDir);
    for (const { src, dest } of urls) {
      const dst = path.join(outDir, dest);
      console.log('Downloading', src, '->', dst);
      await download(src, dst);
    }

    // Download story .txt files based on story_review_table.json
    const storyReviewPath = path.join(outDir, 'en_US/gamedata/excel/story_review_table.json');
    if (fs.existsSync(storyReviewPath)) {
      const storyReview = JSON.parse(fs.readFileSync(storyReviewPath, 'utf8'));
      const storyTxts = new Set();
      for (const act of Object.values(storyReview)) {
        if (act.infoUnlockDatas) {
          for (const unlock of act.infoUnlockDatas) {
            if (unlock.storyTxt && (unlock.storyTxt.startsWith('activities/') || unlock.storyTxt.startsWith('obt/'))) {
              storyTxts.add(unlock.storyTxt);
            }
          }
        }
      }
      const stories = Array.from(storyTxts).slice(0, 100); // limit to first 100 to avoid huge downloads
      for (const story of stories) {
        const src = `${DataSrcEn}/gamedata/story/${story}.txt`;
        const dst = path.join(outDir, 'en_US/gamedata/story', `${story}.txt`);
        if (fs.existsSync(dst)) {
          console.log('Story already exists, skipping', story);
          continue;
        }
        try {
          console.log('Downloading story', story);
          await download(src, dst);
        } catch (e) {
          console.warn('Failed to download story', story, e.message);
        }
      }
    }

    console.log('All files downloaded.');
    process.exit(0);
  } catch (e) {
    console.error('Failed', e);
    process.exit(1);
  }
})();
