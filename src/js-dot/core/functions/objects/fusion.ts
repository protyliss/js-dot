const {keys: KEYS}        = Object;
const {isArray: IS_ARRAY} = Array;

/**
 * Assign with Each Child Property
 * @example
 * ```js
 * fusion({foo: {a: 1}}, {foo: {b:2}}) => {foo: {a:1, b:2}}
 * ```
 * @param target
 * @param source
 */
export function fusion<T extends Object, U extends Object>(target: T, source: U): T & U;

/**
 * Assign Failed, Return `target`
 * @param target
 * @param source if null
 */
export function fusion<T extends Object>(target: T, source: null): T;

/**
 * Assign Failed, Return `source`
 * @param target if null
 * @param source
 */
export function fusion<T extends Object>(target: null, source: T): T;

export function fusion(target, source) {
	if (!source) {
		return {...target};
	}

	if (
		target === null
		|| target === undefined
		|| typeof target !== typeof source
	) {
		return {...source};
	}

	const result = {...target};

	const keys  = KEYS(source);
	let key;
	let current = keys.length;
	while (current-- > 0) {
		key = keys[current];

		const a = target[key];
		const b = source[key];

		if (a === undefined) {
			result[key] = b;
		} else {
			if (IS_ARRAY(a) && IS_ARRAY(b)) {
				const mergedArray = [...a];
				const arrayEnd    = b.length;
				let arrayCurrent  = -1;
				while (++arrayCurrent < arrayEnd) {
					const value = b[arrayCurrent];
					if (mergedArray.indexOf(value) === -1) {
						mergedArray[mergedArray.length] = value;
					}
				}
				result[key] = mergedArray;
				continue;
			}

			result[key] = a && b && typeof a === 'object' && typeof b === 'object' ?
				fusion(a, b) :
				b;
		}
	}

	return result
}
