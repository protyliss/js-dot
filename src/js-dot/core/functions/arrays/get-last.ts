/**
 * Get Array Last Item
 * @example
 * ```js
 * arrayLast([1, 2]); // 2
 * ```
 * @param items
 */
export function getLast<T>(items: T[]): T | undefined {
    return items[items.length - 1];
}
