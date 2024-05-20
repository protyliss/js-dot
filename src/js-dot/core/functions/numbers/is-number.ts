import {_NUMBER} from '../../constants/regex';

/**
 * Test whether a value is string to cast-able to Integer type.
 * @param value
 */
export function isNumber(value: any) {
	const type = typeof value;
	return type === 'number' || type === 'string' ?
		// below is 47.29% slower
		// parseInt(value) == value :
		_NUMBER.test('' + value) :
		false;
}
