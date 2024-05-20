/**
 * Count if Array value same with Something
 * @param items
 * @param match
 */
export function getCount<T>(items: T[], match: T) {
	let count   = 0;
	let current = items.length

	while (current-- > 0) {
		if (items[current] === match) {
			count++;
		}
	}
	return count;
}
