const {random: RANDOM, round: ROUND} = Math;
const {values: VALUES}               = Object;
const RANDOMIZED_MAP                 = new WeakMap();

/**
 * Get Randomized value from object values
 * Does not duplicate with previous result.
 *
 * @example Get a value
 * ```js
 * random({ foo: 1, bar: 2 });
 * ```
 * @param target
 */
export function random<T>(target: Record<any, T>): T;

/**
 * Get Randomized item from array
 * Does not duplicate with previous result.
 *
 * @example Get a item
 * ```js
 * random([1, 2]);
 * ```
 * @param target
 */
export function random<T>(target: T[]): T;

/**
 * Get Randomized character from string
 *
 * @example Get a character
 * @example
 * ```js
 * random('abc');
 * ```
 * @param target
 */
export function random(target: string): string;
/**
 * get random value in range
 *
 * @example Get a number in 0 ~ 10
 * ```js
 * random(10);
 * ```
 *
 * @example Get a number in 1 ~ 10
 * ```js
 * random(1, 10);
 * ```
 * @param min
 * @param max
 */
export function random(min: number, max?: number): number;
export function random(min_or_max_or_target, max?) {
	const target = min_or_max_or_target;

	if (!target && target !== 0) {
		throw new ReferenceError('Cannot get a randomized value from null likes.');
	}

	if (Array.isArray(target)) {
		const {length} = target;
		let value;
		do {
			value = target[random(target.length - 1)];
		} while (length > 1 && RANDOMIZED_MAP.get(target) === value);
		RANDOMIZED_MAP.set(target, value);
		return value;
	}

	switch (typeof target) {
		case 'object':
			const values   = VALUES(target);
			const {length} = values;
			let value;
			do {
				value = target[random(values.length - 1)];
			} while (length > 1 && RANDOMIZED_MAP.get(target) === value);
			RANDOMIZED_MAP.set(target, value);
			return value;

		case 'string':
			return target.charAt(random(0, target.length - 1));
	}

	let min = target;
	if (!max) {
		max = min;
		min = 0;
	}

	const stringMax   = '' + max;
	const point       = stringMax.indexOf('.');
	const decimalSize = point > -1 ? stringMax.length - point : 0;

	if (decimalSize) {
		const byTen = 10 * decimalSize;
		min *= byTen;
		max *= byTen;
		return +(
			((ROUND(RANDOM() * (max - min)) + min) / byTen)
				.toFixed(decimalSize)
		);
	}

	return ROUND(RANDOM() * (max - min)) + min;
}
