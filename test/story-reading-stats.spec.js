import { describe, it, expect } from 'vitest';
import { storyReadingStats } from '../src/data-utils.js';

describe('storyReadingStats()', () => {
    it('aggregates level_main_10-* entries for main_10 paths', () => {
        const storyData = {
            storyReview: { main_10: { infoUnlockDatas: [
                        { storyTxt: 'content/main/level_main_10-01_beg' },
                        { storyTxt: 'content/main/level_main_10-01_end' },
                    ] } },
            storySize: {
                'content/main/level_main_10-01_beg': { words: 1, minutes: 1 },
                'content/main/level_main_10-01_end': { words: 2, minutes: 3 },
                // entries for other acts shouldn't affect this
                'content/main/level_main_09-01_beg': { words: 100, minutes: 10 }
            }
        };

        expect(storyReadingStats(storyData, 'main_10')).toEqual({ words: 3, minutes: 4 });
    });

    it('returns undefined when storyId does not exist in storyReview', () => {
        const storyData = { storyReview: {}, storySize: {} };
        expect(storyReadingStats(storyData, 'main_10')).toBeUndefined();
    });

    it('returns undefined when infoUnlockDatas is an empty array', () => {
        const storyData = { storyReview: { main_10: { infoUnlockDatas: [] } }, storySize: {} };
        expect(storyReadingStats(storyData, 'main_10')).toBeUndefined();
    });
    it('ignores filenames not present in storySize', () => {
        const storyData = {
            storyReview: { main_10: { infoUnlockDatas: [
                { storyTxt: 'content/main/meta_data' }
            ] } }, storySize: {} };
        expect(storyReadingStats(storyData, 'main_10')).toEqual({ words: 0, minutes: 0 });
    });
});
