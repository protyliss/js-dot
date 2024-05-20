import {StyleProperties} from '../interfaces/style';
import {toKebabCase} from '@js-dot/core';

/**
 * Get CSS Properties String
 * @param properties
 */
export function $properties(properties: StyleProperties) {
	if (typeof properties === 'string') {
		let propertyString = properties as string;
		const startsBrace = propertyString.includes('{');
		const endsBrace   = propertyString.includes('}');

		if (!startsBrace) {
			if (endsBrace) {
				throw new ReferenceError('Property String should be starts with `{`');
			} else {
				propertyString = '{' + propertyString + '}';
			}
		} else if (!endsBrace) {
			throw new ReferenceError('Property String should be ends with `}`');
		}

		return propertyString;
	}

	const strings = [];
	for (let property in properties) {
		if (!properties.hasOwnProperty(property)) {
			continue;
		}
		strings[strings.length] = `${toKebabCase(property)}: ${properties[property]}`;
	}
	return `{
${strings.join(';\n')}
}`;
}
