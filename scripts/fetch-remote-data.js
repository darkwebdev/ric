#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.resolve(__dirname, '..');
// Serve these files statically by placing them under public
const outDir = path.join(root, 'public', 'data', 'remote');

const DataSrc = 'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master';
const DataSrcYostar = 'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData_YoStar/main';
const urls = [
  // Prefetch core story metadata and tables
  { src: `${DataSrcYostar}/en_US/gamedata/excel/uniequip_table.json`, dest: 'en_US/gamedata/excel/uniequip_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/story_table.json`, dest: 'en_US/gamedata/excel/story_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/story_review_meta_table.json`, dest: 'en_US/gamedata/excel/story_review_meta_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/story_review_table.json`, dest: 'en_US/gamedata/excel/story_review_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/story/story_variables.json`, dest: 'en_US/gamedata/story/story_variables.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/uniequip_table.json`, dest: 'en_US/gamedata/excel/uniequip_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/story_table.json`, dest: 'en_US/gamedata/excel/story_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/story_review_meta_table.json`, dest: 'en_US/gamedata/excel/story_review_meta_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/story_review_table.json`, dest: 'en_US/gamedata/excel/story_review_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/story/story_variables.json`, dest: 'en_US/gamedata/story/story_variables.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/skin_table.json`, dest: 'en_US/gamedata/excel/skin_table.json' },
  { src: `${DataSrc}/zh_CN/gamedata/excel/skin_table.json`, dest: 'zh_CN/gamedata/excel/skin_table.json' },
  { src: `${DataSrcYostar}/en_US/gamedata/excel/charword_table.json`, dest: 'en_US/gamedata/excel/charword_table.json' },
  { src: `${DataSrc}/zh_CN/gamedata/excel/character_table.json`, dest: 'zh_CN/gamedata/excel/character_table.json' },
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

    // Skipping .txt story files for now to avoid large downloads and repo bloat.

    console.log('All files downloaded.');
    process.exit(0);
  } catch (e) {
    console.error('Failed', e);
    process.exit(1);
  }
})();
