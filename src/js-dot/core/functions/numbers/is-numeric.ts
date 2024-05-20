/**
 * Test whether a value is string to cast-able to Numeric type.
 * @param value
 */
export function isNumeric(value: any) {
	const type = typeof value;
	// `if` is 0.27% slower
	// `switch` is 0.06 % slower
	return type === 'number' ?
		true :
		type === 'string' ?
			// Invalid with value contains `\d+(\.\d+)?`
			// return !isNaN(parseFloat(value as any))

			// Invalid with ''
			// return value == +value

			// below is 12.69% Slower
			// `parseFloat(value) == value;`

			// ' ' returns 0
			value.trim().length > 0 && value == +value :
			false;
}
