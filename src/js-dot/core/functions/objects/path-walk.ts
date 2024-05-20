type PathWalk<T, U extends string> = Walk<T, StableWorkPath<U>>;

type StableWorkPath<T extends string> =
	T extends `${infer A}[${infer R}` ?
		R extends `${infer B}]${infer C}` ?
			C extends '' ?
				`${A}.${B}` :
				StableWorkPath<`${A}.${B}${C}`> :
			string :
		T;

type Walk<T, U> =
	T extends any[] ?
		WalkArray<T, U> :
		T extends object ?
			WalkObject<T, U> :
			unknown

type WalkObject<T extends object, U> =
	U extends `${infer K}.${infer R}` ?
		K extends keyof T ?
			Walk<T[K], R> :
			unknown :
		U extends keyof T ?
			T[U] :
			unknown


type WalkArray<T extends any[], U> =
	U extends `${infer K}.${infer R}` ?
		K extends `${number}` ?
			Walk<T[number], R> :
			unknown :
		U extends `${number}` ?
			T[number] :
			unknown;

const _KEY_LITERAL        = /\[([^\]]+)]/g
const {isArray: IS_ARRAY} = Array;

/**
 * Get Child Property by Stringified Path
 * @example
 * ```js
 * pathWalk({foo: {bar: 1}}, 'foo.bar'); // 1
 * pathWalk({foo: [1, 2]}, 'foo[1]'); // 2
 * ```
 * @param object
 * @param path
 */
export function pathWalk<T extends object, U extends string>(object: T, path: U): PathWalk<T, U> {
	if (!path) {
		return undefined;
	}

	const bracket = path.indexOf('[');
	if (bracket > -1 && path.indexOf(']', bracket) > -1) {
		path = path.replace(_KEY_LITERAL, '.$1') as U;
	} else if (path.indexOf('.') < 0) {
		return object[path as any];
	}

	const segments = path.split('.');
	const end      = segments.length;

	let target  = object;
	let current = -1;
	while (++current < end && target) {
		const segment = segments[current];

		if (!IS_ARRAY(target) && !target.hasOwnProperty(segment)) {
			return undefined;
		}

		target = target[segment];
	}

	return target as any;
}