const OTHER_CASE_GLUE = /[\s_].|[A-Z]/g;

/**
 * String transform to `kebab-case`
 * @param value
 */
export function toKebabCase(value: string | string[]): string {
	if (!value) {
		return '';
	}

	if (Array.isArray(value)) {
		const {length} = value;
		return length > 1 ?
			value[0] + value.slice(1, length).join('-').toLowerCase() :
			value[0];
	}

	return (value.charAt(0) + value.slice(1).replace(OTHER_CASE_GLUE, transformFunction)).toLowerCase();
}

function transformFunction(target) {
	return '-' + target.charAt(target.length - 1).toLowerCase();
}
