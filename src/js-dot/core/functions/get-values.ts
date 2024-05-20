/**
 * Get values from Iterator
 * @param iterator
 */
export function getValues<T>(iterator: Iterable<T>): T[] {
	const values = [];
	for (const value of iterator) {
		values[values.length] = value;
	}
	return values;
}