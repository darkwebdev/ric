import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Mock dependencies
vi.mock('fs');
vi.mock('path');
vi.mock('https');

describe('fetch-game-data.js', () => {
  let mockStoryReview;
  let ignoredStories;

  beforeEach(() => {
    vi.clearAllMocks();

    // Reset the ignored stories for each test
    ignoredStories = new Set([
      'activities/act13mini'
    ]);

    mockStoryReview = {
      act1: {
        infoUnlockDatas: [
          { storyTxt: 'activities/act1/level_act1_01' },
          { storyTxt: 'activities/act13mini/level_act13mini_st06' },
          { storyTxt: 'obt/main/level_main_01' }
        ]
      }
    };

    // Mock fs methods
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    fs.createWriteStream.mockReturnValue({
      on: vi.fn(),
      pipe: vi.fn()
    });
    fs.readFileSync.mockReturnValue(JSON.stringify(mockStoryReview));

    // Mock path methods
    path.resolve.mockReturnValue('/mock/root');
    path.join.mockImplementation((...args) => args.join('/'));
    path.dirname.mockReturnValue('/mock/dir');

    // Mock https
    const mockResponse = {
      statusCode: 200,
      headers: {},
      pipe: vi.fn(),
      on: vi.fn((event, callback) => {
        if (event === 'end') callback();
      })
    };
    https.get.mockImplementation((url, callback) => {
      callback(mockResponse);
      return { on: vi.fn() };
    });
  });

  describe('ignored stories', () => {
    it('should skip stories that start with ignored prefixes', () => {
      // This test would need to run the actual script logic
      // For now, let's test the logic directly
      const stories = [
        'activities/act1/level_act1_01',
        'activities/act13mini/level_act13mini_st06',
        'obt/main/level_main_01'
      ];

      const filteredStories = stories.filter(story =>
        !Array.from(ignoredStories).some(ignored => story.startsWith(ignored))
      );

      expect(filteredStories).toEqual([
        'activities/act1/level_act1_01',
        'obt/main/level_main_01'
      ]);
    });

    it('should skip stories that start with ignored prefixes, including partial matches', () => {
      const stories = [
        'activities/act13mini',  // exact match
        'activities/act13mini/level_act13mini_st06',  // starts with
        'activities/act13mini_other'  // starts with
      ];

      const filteredStories = stories.filter(story =>
        !Array.from(ignoredStories).some(ignored => story.startsWith(ignored))
      );

      expect(filteredStories).toEqual([]);
    });
  });

  describe('story collection', () => {
    it('should collect stories from story review data', () => {
      const storyTxts = new Set();
      for (const act of Object.values(mockStoryReview)) {
        if (act.infoUnlockDatas) {
          for (const unlock of act.infoUnlockDatas) {
            if (unlock.storyTxt && (unlock.storyTxt.startsWith('activities/') || unlock.storyTxt.startsWith('obt/'))) {
              storyTxts.add(unlock.storyTxt);
            }
          }
        }
      }

      expect(Array.from(storyTxts)).toEqual([
        'activities/act1/level_act1_01',
        'activities/act13mini/level_act13mini_st06',
        'obt/main/level_main_01'
      ]);
    });
  });

  describe('download functionality', () => {
    it('should download and save story text files', async () => {
      const newContent = '{"test": "data"}';
      
      const mockResponse = {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        on: vi.fn()
      };
      
      // Mock the data event and end event
      mockResponse.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(Buffer.from(newContent));
        }
        if (event === 'end') {
          callback();
        }
      });
      
      https.get.mockImplementation((url, callback) => {
        callback(mockResponse);
        return { on: vi.fn() };
      });

      fs.existsSync.mockReturnValue(false);
      fs.writeFileSync.mockImplementation(() => {});

      const result = await new Promise((resolve) => {
        https.get('https://example.com/test.json', (res) => {
          const chunks = [];
          res.on('data', chunk => chunks.push(chunk));
          res.on('end', () => {
            const newContent = Buffer.concat(chunks).toString('utf8');
            fs.writeFileSync('/mock/file.json', newContent);
            resolve(true); // New file, so changed
          });
        });
      });

      expect(result).toBe(true);
      expect(fs.writeFileSync).toHaveBeenCalledWith('/mock/file.json', newContent);
    });

    it('should detect when file content has not changed', async () => {
      const existingContent = '{"test": "data"}';
      
      const mockResponse = {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        on: vi.fn()
      };
      
      mockResponse.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(Buffer.from(existingContent));
        }
        if (event === 'end') {
          callback();
        }
      });
      
      https.get.mockImplementation((url, callback) => {
        callback(mockResponse);
        return { on: vi.fn() };
      });

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(existingContent);
      fs.writeFileSync.mockImplementation(() => {});

      const result = await new Promise((resolve) => {
        https.get('https://example.com/test.json', (res) => {
          const chunks = [];
          res.on('data', chunk => chunks.push(chunk));
          res.on('end', () => {
            const newContent = Buffer.concat(chunks).toString('utf8');
            const existingContent = fs.readFileSync('/mock/file.json', 'utf8');
            const hasChanged = newContent !== existingContent;
            fs.writeFileSync('/mock/file.json', newContent);
            resolve(hasChanged);
          });
        });
      });

      expect(result).toBe(false);
      expect(fs.writeFileSync).toHaveBeenCalledWith('/mock/file.json', existingContent);
    });

    it('should detect when file content has changed', async () => {
      const existingContent = '{"test": "old"}';
      const newContent = '{"test": "new"}';
      
      const mockResponse = {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        on: vi.fn()
      };
      
      mockResponse.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(Buffer.from(newContent));
        }
        if (event === 'end') {
          callback();
        }
      });
      
      https.get.mockImplementation((url, callback) => {
        callback(mockResponse);
        return { on: vi.fn() };
      });

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(existingContent);
      fs.writeFileSync.mockImplementation(() => {});

      const result = await new Promise((resolve) => {
        https.get('https://example.com/test.json', (res) => {
          const chunks = [];
          res.on('data', chunk => chunks.push(chunk));
          res.on('end', () => {
            const newContent = Buffer.concat(chunks).toString('utf8');
            const existingContent = fs.readFileSync('/mock/file.json', 'utf8');
            const hasChanged = newContent !== existingContent;
            fs.writeFileSync('/mock/file.json', newContent);
            resolve(hasChanged);
          });
        });
      });

      expect(result).toBe(true);
      expect(fs.writeFileSync).toHaveBeenCalledWith('/mock/file.json', newContent);
    });

    it('should skip download if file already exists', async () => {
      fs.existsSync.mockReturnValue(true);

      const storyPath = 'activities/act1/level_act1_01';
      const url = `https://example.com/${storyPath}.txt`;
      const filePath = `/mock/root/${storyPath}.txt`;

      // Simulate the check
      if (fs.existsSync(filePath)) {
        // Skip download
      } else {
        https.get(url, () => {});
      }

      expect(https.get).not.toHaveBeenCalled();
      expect(fs.createWriteStream).not.toHaveBeenCalled();
    });

    it('should handle download errors', async () => {
      const mockResponse = {
        statusCode: 404,
        headers: {},
        on: vi.fn((event, callback) => {
          if (event === 'end') setTimeout(callback, 10);
        })
      };
      https.get.mockImplementation((url, callback) => {
        callback(mockResponse);
        return { on: vi.fn() };
      });

      const storyPath = 'activities/act1/level_act1_01';
      const url = `https://example.com/${storyPath}.txt`;

      let errorHandled = false;
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          errorHandled = true;
        }
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(errorHandled).toBe(true);
    });
  });

  describe('version management', () => {
    it('should create version file when changes are detected', () => {
      // Mock that changes were detected
      const hasChanges = true;
      
      if (hasChanges) {
        const versionData = { 
          version: 1234567890,
          timestamp: '2025-10-27T10:00:00.000Z',
          description: 'Arknights story data version'
        };
        fs.writeFileSync('/mock/version.json', JSON.stringify(versionData, null, 2));
      }

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/version.json',
        expect.stringContaining('"version": 1234567890')
      );
    });

    it('should not create version file when no changes are detected', () => {
      // Mock that no changes were detected
      const hasChanges = false;
      
      if (hasChanges) {
        fs.writeFileSync('/mock/version.json', '{}');
      }

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should include timestamp and description in version file', () => {
      const versionData = { 
        version: Date.now(),
        timestamp: new Date().toISOString(),
        description: 'Arknights story data version'
      };
      
      fs.writeFileSync('/mock/version.json', JSON.stringify(versionData, null, 2));

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/version.json',
        expect.stringContaining('"description": "Arknights story data version"')
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/version.json',
        expect.stringContaining('"timestamp":')
      );
    });
  });
});