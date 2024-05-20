/**
 * localeCompare Factory for Object Array
 * @param key
 */

export function localeCompareBy(key: string) {
    return function (a, b) {
        return a[key].localeCompare(b[key]);
    }
}
