/**
 * Get Greatest Common Divisor from two of number.
 * @param a
 * @param b
 */
export function getGcd(a: number, b: number);
/**
 * Get Greatest Common Divisor from number array
 * @param numbers
 */
export function getGcd(numbers: number[]);
export function getGcd(a_or_numbers: number | number[], b?: number) {
	return _getGcd(Array.isArray(a_or_numbers) ? a_or_numbers : [a_or_numbers, b]);
}

/**
 * @private
 */
function _getGcd(numbers: number[]) {
	const {length: end} = numbers;

	if (!end) {
		throw new ReferenceError('Cannot calculate with empty array');
	}

	let result  = numbers[0];
	let current = 0;
	while (++current < end) {
		result = _findGcd(result, numbers[current]);
	}

	return result;
}

/**
 * @private
 */
function _findGcd(a: number, b: number) {
	return b === 0 ? a : _findGcd(b, a % b);
}