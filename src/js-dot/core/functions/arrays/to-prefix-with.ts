/**
 * Add Prefix to Each Item of Array
 * @param items
 * @param prefix
 */
export function toPrefixWith(items: Array<string | number>, prefix: string) {
	const result = [];
	let current  = items.length;
	while (current-- > 0) {
		result[current] = prefix + items[current];
	}
	return result;
}
