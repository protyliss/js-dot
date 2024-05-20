export function extract<T extends {}, V extends keyof T>(
	target: T,
	keys: V[]
): { [K in V]?: T[K] } {
	const result = {};
	let current = keys.length;
	let key;

	while (current-- > 0) {
		key = keys[current];
		if (target.hasOwnProperty(key)) {
			result[key] = target[key];
			delete target[key];
		}
	}
	return result;
}