const {isArray: IS_ARRAY} = Array;

export function arrayify<T>(target: T | T[]): T[] {
	if (IS_ARRAY(target)) {
		return target;
	}
	if (target && target.constructor === Object) {
		return Object.values(target);
	}

	return [target];
}