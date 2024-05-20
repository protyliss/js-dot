export function objectExtractMap<T extends {}, V extends keyof T>(target: T, keys: V[], map?: (entry: { key: V, value: T[V] }) => void): number {
    let current = keys.length;
    let key;
    let count = 0;

    while (current-- > 0) {
        key = keys[current];
        if (target.hasOwnProperty(key)) {
            map({key, value: target[key]});
            count++;
            delete target[key];
        }
    }

    return count;
}
