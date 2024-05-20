/**
 * get array filled with numbers from min number to max number
 *
 * @example
 * // returns [1, 2, 3]
 * getNumbers(1, 3);
 *
 * @param min the minimum number to begin
 * @param max the maximum number to end
 */
export function getNumbers(min: number, max: number): number[];
/**
 * get array filled with numbers from zero to max number
 *
 * @example
 * // returns [0, 1, 2, 3]
 * getNumbers(3);
 *
 * @param max the maximum number to end from 0
 */
export function getNumbers<T extends number>(max: T): number[] & { length: T };
export function getNumbers(min_or_max: number, max?: number) {
	let min = min_or_max;

	if (!max) {
		max = min;
		min = 0;
	}

	max++;

	const items: number[] = [];
	do {
		items[items.length] = min;
	} while (++min < max);

	return items;
}
