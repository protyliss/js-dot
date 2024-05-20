import {toKebabCase} from '@js-dot/core';


/**
 * Get CSS Variable Name as `--kebab-Case`
 * @param name
 */
export function getVarName(name: string) {
	return '--' + toKebabCase(
		name.startsWith('--') ?
			name.slice(2) :
			name
	);
}