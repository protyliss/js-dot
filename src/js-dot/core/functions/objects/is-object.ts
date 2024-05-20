export function isObject(target): target is object {
	return target && typeof target === 'object';
}
