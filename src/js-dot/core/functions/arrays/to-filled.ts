/**
 * Get new array with not equals to null and undefined
 * @example
 * ```js
 * arrayNotEmpty([1, false, null, undefined]); // [1, false]
 * ```
 * @param items
 */
export function toFilled(items: any[]): any[] | null {
    const result = [];
    const end = items.length;
    let current = -1;
    while (++current < end) {
        const item = items[current];
        if (!(item === null || item === undefined)) {
            result[result.length] = item;
        }
    }
    return result;
}
