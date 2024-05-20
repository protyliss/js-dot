import {isBooleanString} from '../booleans/is-boolean-string';
import {isNumeric} from '../numbers/is-numeric';
import {toBoolean} from '../booleans/to-boolean';

/**
 * Type Casting from String Value
 * @param value
 */
export function casting(value: number | string | boolean) {
	if (isNumeric(value as string)) {
		return +value;
	}
	if (isBooleanString(value as string)) {
		return toBoolean(value);
	}

	return value;
}
