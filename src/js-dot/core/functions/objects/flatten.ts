export type NonObjectName<T> = {
    [K in keyof T]: T[K] extends undefined | null | number | string | Array<any> | Function ? K : never
}[keyof T];

export type ObjectFlatten<T, NONE_OBJECT extends keyof T = NonObjectName<T>> = {
    [K in NONE_OBJECT] :T[K];
} & Record<string, any>

/**
 * Get Child Object Property into Root
 * @param target
 */
export function flatten<T extends Object>(target: T): ObjectFlatten<T> {
    const result = {};
    const keys = Object.keys(target);
    const end = keys.length;
    let current = -1;

    while (++current < end) {
        const key = keys[current];
        let value = target[key];

        if (value instanceof Object) {
            value = flatten(value);

            const childKeys = Object.keys(value);
            const childEnd = childKeys.length;
            let childCurrent = -1;
            while (++childCurrent < childEnd) {
                const childKey = childKeys[childCurrent];
                const flatKey = key + childKey.charAt(0).toUpperCase() + childKey.slice(1);
                result[flatKey] = value[childKey];
            }
        } else {
            result[key] = value;
        }
    }

    return result as ObjectFlatten<T>;
}
