import { categorizeStories } from '../src/data-utils.js';

describe('categorizeStories()', () => {
    it('should categorize stories correctly', () => {
        const storyReview = {
            main_1: { id: 'main_1', entryType: 'MAINLINE', infoUnlockDatas: [] },
            story_1: { id: 'story_1', entryType: 'NONE', infoUnlockDatas: [] },
            side_1: { id: 'side_1', entryType: 'ACTIVITY', infoUnlockDatas: [] },
            mini_1: { id: 'mini_1', entryType: 'MINI_ACTIVITY', infoUnlockDatas: [] },
            side_2: { id: 'side_2', entryType: 'ACTIVITY', infoUnlockDatas: [] },
            unknown: { id: 'unknown', entryType: 'UNKNOWN', infoUnlockDatas: [] },
        };
        const storyReviewMeta = {
            actArchiveData: {
                components: {
                    main_1: {
                        avg: {
                            avgs: {
                                avg1: { avgSortId: 1, avgId: 'avg1' },
                                avg2: { avgSortId: 2, avgId: 'avg2' },
                            },
                        },
                    },
                },
            },
            actArchiveResData: {
                avgs: {
                    avg1: { breifPath: 'path1', contentPath: 'content1', desc: 'desc1' },
                    avg2: { breifPath: 'path2', contentPath: 'content2', desc: 'desc2' },
                },
            },
        };
        const moduleStory = {
            equipDict: {
                module_1: { uniEquipName: 'Module 1' },
            },
        };
        const storyTable = {
            'content1_zone_enter': true,
        };

        const result = categorizeStories({ storyReview, storyReviewMeta, moduleStory, storyTable });

        expect(result).toEqual({
            record: ['story_1'],
            main: ['main_1'],
            side: ['side_1', 'side_2', 'unknown',],
            mini: ['mini_1'],
            module: [],
            rogue: [],
        });
    });
});
