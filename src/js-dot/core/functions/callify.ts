/**
 * Get a result whether it is a function or not.
 *
 * @example
 * ```js
 * // get 'a'
 * const a = callify('a');
 * // get 'b'
 * const b = callify(() => 'b');
 * ```
 * @param target
 */
export function callify<T extends null | undefined | number | string | Function>(target: T)
    : T extends () => infer U ? U : T {
    if (typeof target === 'function') {
        return target();
    }
    return target as any;
}
