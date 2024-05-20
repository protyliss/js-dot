/**
 * Create map as each items primary key value
 *
 * @example
 * ```js
 * objectsToKeyMapArray(
 * 	[
 * 		{id: 'foo', value: 1},
 * 		{id: 'foo', value: 2},
 * 		{id: 'bar', value: 3},
 * 		{id: 'bar', value: 4}
 * 	],
 * 	'id'
 * );
 * ```
 * returns:
 * ```json
 * {
 *     "foo": [
 *         {id: 'foo', value: 1},
 *         {id: 'foo', value: 2}
 *     ],
 *     "bar": [
 *         {id: 'bar', value: 3},
 *         {id: 'bar', value: 4}
 *     ]
 * }
 * ```
 * @param items Object Array
 * @param keyName Object Primary Key
 */
export function objectsToKeyMapArray<T extends Record<any, any>, K extends keyof T>(items: T[], keyName: K): Record<T[K], T[]> {
	const map   = {} as Record<keyof T, T[]>;
	const end   = items.length;
	let current = -1;

	while (++current < end) {
		const item  = items[current];
		const key   = item[keyName];
		const store = map[key];
		if (store) {
			store[store.length] = item;
		} else {
			map[key] = [item];
		}
	}
	return map;
}
