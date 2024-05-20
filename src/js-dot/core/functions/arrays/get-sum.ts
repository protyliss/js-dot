/**
 * get sum value from number array
 * @example
 * ```js
 * arraySum([1, 2]); // 3
 * ```
 * @param items
 */
export function getSum(items: number[]): number {
    let current = items.length;
    let total = 0;
    while (current-- > 0) {
        total += items[current];
    }
    return total;
}
