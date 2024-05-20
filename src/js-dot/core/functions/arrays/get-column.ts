/**
 * Get property values array from target property in array item.
 *
 * @example
 * ```js
 * const origin = [
 *     {
 *         value: 'foo'
 *     },
 *     {
 *         value: 'bar
 *     }
 * ];
 *
 * // ['foo', 'bar']
 * const column = getColumn(origin, 'value');
 * ```
 * @param items
 * @param propertyName
 */
export function getColumn<T extends object, U extends keyof T>(items: T[], propertyName: U): Array<T[U]> {
	const values = [];
	const end    = items?.length;
	let current  = -1;

	while (++current < end) {
		values[values.length] = items[current][propertyName];
	}

	return values;
}
