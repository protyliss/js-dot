/**
 * Add Suffix to Each Item of Array
 * @param items
 * @param suffix
 */
export function toSuffixWith(items: Array<string | number>, suffix: string) {
	const result = [];
	let current  = items.length;
	while (current-- > 0) {
		result[current] = items[current] + suffix;
	}
	return result;
}
