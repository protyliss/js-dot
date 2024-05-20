/**
 * to Remove overed decimal values
 * @description
 *   3% ~ 22% faster than cached RegExp way
 * @param value
 * @param size
 */
export function toFit(value: number | string, size = 2) {
	const stringValue = ''+value;
	const index = stringValue.indexOf('.');
	
	if (index > -1) {
		const length = index + size + 1;
		if (stringValue.length > length) {
			return Number(stringValue.substr(0, length));
		}
	}
	return value;
}
