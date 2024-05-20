/**
 * Combine CSS properties
 * @description
 * Concat property values:
 * - `transform`
 * @example
 * ```js
 * $combine(
 * 	{
 *  	transform: 'rotate(1turn)'
 * 	},
 * 	{
 * 		transform: 'scale(2)'
 * 	}
 * );
 * ```
 *
 * ```js
 * {
 *     transform: 'rotate(1turn) scale(2)'
 * }
 * ```
 */
export function $combine<T extends object, U extends object>(target: T, source: U): T & U {
	if (target && target['transform'] && source && source['transform']) {
		target['transform'] += ' ' + source['transform'];
		delete source['transform'];
	}

	return {
		...(target || {}),
		...(source || {})
	} as T & U;
}