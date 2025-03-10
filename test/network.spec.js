import { charImageSrc, fetchOperators } from '../src/network.js';
import { AssetSrc } from '../src/const.js';
import charTableEn from './mocks/character_table-en_US.json';
import charTableCn from './mocks/character_table-zh_CN.json';
import skinTable from './mocks/skin_table-en_US.json';
import charwordTable from './mocks/charword_table-en_US.json';

global.fetch = vi.fn();

describe.skip('network functions', () => {
    describe('fetchOperators()', () => {
        it('should fetch Global operators', async () => {
            global.fetch.mockImplementation(url => Promise.resolve({
                clone: () => ({
                    json: () => ({
                        catch: () => {
                            switch (true) {
                                case url.endsWith('character_table.json'):
                                    return charTableEn;
                                case url.endsWith('skin_table.json'):
                                    return skinTable;
                                case url.endsWith('charword_table.json'):
                                    return charwordTable;
                                default:
                                    return {};
                            }
                        }
                    })
                })
            }));

            const operators = await fetchOperators();
            expect(operators[0]).toEqual(expect.objectContaining({ name: 'Aak' }));
        });

        it('should fetch CN operators', async () => {
            global.fetch.mockImplementation(url => Promise.resolve({
                clone: () => ({
                    json: () => ({
                        catch: () => {
                            switch (true) {
                                case url.endsWith('character_table.json'):
                                    return charTableCn;
                                case url.endsWith('skin_table.json'):
                                    return skinTable;
                                case url.endsWith('charword_table.json'):
                                    return charwordTable;
                                default:
                                    return {};
                            }
                        }
                    })
                })
            }));

            const operators = await fetchOperators();
            expect(operators[0]).toEqual(expect.objectContaining({ name: 'Aak' }));
        });
    });

    describe('charImageSrc()', () => {
        it('should return the correct image source', () => {
            const expected = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/avg/characters/avg_npc_003%231%241.png';
            expect(charImageSrc('avg_npc_003')).toBe(expected);
        });
        it('should return the correct image source with face variation', () => {
            const expected = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/avg/characters/avg_npc_003%232%241.png';
            expect(charImageSrc('avg_npc_003#2')).toBe(expected);
        });
        it('should return the correct image source with body variation', () => {
            const expected = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/avg/characters/avg_npc_003%231%242.png';
            expect(charImageSrc('avg_npc_003$2')).toBe(expected);
        });
        it('should return the correct image source with face & body variation', () => {
            const expected = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/avg/characters/avg_npc_003%232%242.png';
            expect(charImageSrc('avg_npc_003#2$2')).toBe(expected);
        });
        it('should return the correct alternative image source', () => {
            const expected = 'https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/characters/avg_npc_003%231%241.png';
            expect(charImageSrc('avg_npc_003', AssetSrc.aceship)).toBe(expected);
        });
    });
});
