import {random} from '../random';

/**
 * get shuffled items
 * @example
 * ```js
 * arrayShuffle([1, 2]); // [1, 2] or [2, 1]
 * ```
 * @param items
 */
export function toShuffle(items: any[]) {
    const shuffled = [...items];
    const end = shuffled.length;
    const max = end - 1;
    let current = -1;
    while (++current < end) {
        const toIndex = random(max);
        const fromValue = shuffled[current];
        shuffled[current] = shuffled[toIndex];
        shuffled[toIndex] = fromValue;
    }
    return shuffled;
}
