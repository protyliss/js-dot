/**
 * get new array as number
 * @example
 * ```js
 * arrayToNumber(['1', '2']); // [1, 2]
 * ```
 * @param items
 */
export function toNumber(items: any[]) {
    const result = [];
    const end = items.length;
    let current = -1;
    while (++current < end) {
        result[current] = +items[current];
    }
    return result;
}
