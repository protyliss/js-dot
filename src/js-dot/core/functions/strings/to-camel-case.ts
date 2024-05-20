const OTHER_CASE_DELIMITER = /[\s-_]([a-z])/g;

/**
 * String transform to `camelCase`
 * @param value
 */
export function toCamelCase(value: string | string[]) {
	if (Array.isArray(value)) {
		const {length} = value;
		return length > 1 ?
			value[0] + value.slice(1, length).map(transformFunction).join('') :
			value[0];
	}

	return value.charAt(0).toLowerCase() + value.substr(1).replace(OTHER_CASE_DELIMITER, replaceFunction);
}

function replaceFunction(target: string) {
	return target.toUpperCase().charAt(target.length - 1);
}

function transformFunction(word: string) {
	return word.substr(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

export function toCapitalizedCamelCase(value: string | string[]) {
	const camelCased = toCamelCase(value);
	return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}
