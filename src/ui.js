import { BlockingFns } from './const.js';

export function isBlocking(fn) {
    return BlockingFns.includes(fn);
}
