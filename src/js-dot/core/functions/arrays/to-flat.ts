/**
 * Get Flatten Array as Recursive
 * @example
 * ```
 * arrayFlat([1, [2], [[3]]]); // [1, 2, 3]
 * ```
 * @param items

 */
export function toFlat(items: any[]): any[] {
    const {isArray} = Array;
    const {push} = Array.prototype;
    // @ts-ignore
    return (toFlat = function (items) {
            const flatten = []
            const end = items.length;
            let current = -1;
            while (++current < end) {
                const item = items[current];
                if (isArray(item)) {
                    push.apply(flatten, toFlat(item));
                } else {
                    flatten.push(item);
                }
            }
            return flatten;
        }
    ).apply(this, arguments);
}
