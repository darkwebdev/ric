import { charImageSrc } from '../src/fetch.js';
import { AssetSrc } from '../src/const.js';

describe('fetch functions', () => {
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
