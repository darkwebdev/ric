import { vi } from 'vitest';
import { charImageSrc } from '../src/asset-sources';
import { fetchOperators, checkForDataUpdates } from '../src/network';
import { AssetSrc } from '../src/const';
import charTableEn from './mocks/character_table-en_US.json';
import charTableCn from './mocks/character_table-zh_CN.json';
import skinTable from './mocks/skin_table-en_US.json';
import charwordTable from './mocks/charword_table-en_US.json';

global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('network functions', () => {
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

    describe('checkForDataUpdates()', () => {
        beforeEach(() => {
            vi.clearAllMocks();
            localStorageMock.getItem.mockClear();
            localStorageMock.setItem.mockClear();
            localStorageMock.removeItem.mockClear();
        });

        it('should return false when version file is not found', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404
            });

            const result = await checkForDataUpdates();
            expect(result).toBe(false);
            expect(localStorageMock.getItem).not.toHaveBeenCalled();
        });

        it('should return false when no stored version exists', async () => {
            const remoteVersion = { version: 1234567890 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(remoteVersion)
            });
            localStorageMock.getItem.mockReturnValue(null);

            const result = await checkForDataUpdates();
            expect(result).toBe(true);
            expect(localStorageMock.getItem).toHaveBeenCalledWith('storyDataVersion');
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('storyData');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('storyDataVersion', '1234567890');
        });

        it('should return true and clear cache when remote version is newer', async () => {
            const remoteVersion = { version: 2000000000 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(remoteVersion)
            });
            localStorageMock.getItem.mockReturnValue('1000000000'); // Older version

            const result = await checkForDataUpdates();
            expect(result).toBe(true);
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('storyData');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('storyDataVersion', '2000000000');
        });

        it('should return false when stored version is up to date', async () => {
            const remoteVersion = { version: 1000000000 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(remoteVersion)
            });
            localStorageMock.getItem.mockReturnValue('1000000000'); // Same version

            const result = await checkForDataUpdates();
            expect(result).toBe(false);
            expect(localStorageMock.removeItem).not.toHaveBeenCalled();
            expect(localStorageMock.setItem).not.toHaveBeenCalled();
        });

        it('should return false when stored version is newer than remote', async () => {
            const remoteVersion = { version: 1000000000 };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(remoteVersion)
            });
            localStorageMock.getItem.mockReturnValue('2000000000'); // Newer version

            const result = await checkForDataUpdates();
            expect(result).toBe(false);
            expect(localStorageMock.removeItem).not.toHaveBeenCalled();
            expect(localStorageMock.setItem).not.toHaveBeenCalled();
        });

        it('should handle fetch errors gracefully', async () => {
            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await checkForDataUpdates();
            expect(result).toBe(false);
            expect(localStorageMock.getItem).not.toHaveBeenCalled();
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
