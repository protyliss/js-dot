/**
 * Get Items as not duplicated in Array
 * @example
 * ```js
 * arrayUnique([1, 1, 2, 2]); // [1, 2]
 * ```
 * @param items
 */
export function toUnique<T>(items: T[]): T[] {
    const result = [];
    const end = items.length;
    let current = -1;
    while (++current < end) {
        const item = items[current];
        if (result.indexOf(item) < 0) {
            result[result.length] = item;
        }
    }
    return result;
}
