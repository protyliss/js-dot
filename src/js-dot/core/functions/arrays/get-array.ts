/**
 * Get Array with length and fill of it
 * @description
 * `(new Array()).fill()` is 56% slower than this
 * @example
 * ```js
 * // [true, true, true]
 * const filled = arrayFill(3, true);
 * ```
 * @param length
 * @param value
 */
export function getArray<T>(length: number, value: T): T[] {
	const result = [];
	let current  = length;
	while (current-- > 0) {
		result[current] = value;
	}
	return result;
}
