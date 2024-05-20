/**
 * 
 * @param value
 * @param size
 */
export function zerofill(value: number | string, size: number = 2) {
	value = ''+value;
	return size - value.length ?
		value.padStart(size, '0') :
		value;
}
