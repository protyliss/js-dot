/**
 * Get :root variable
 * @param name
 */
import {getVarName} from './get-var-name';

/**
 * Get Root Variable
 * @example
 * Get `--var-name`
 * ```js
 * getVar('varName');
 * ```
 * @param name
 */
export function getVar(name: string): string;

/**
 * Get Root Variables as map from Array
 * @example
 * Get {foo: '--foo', bar, :'--bar'}
 *
 * ```js
 * getVar(['foo', 'bar']);
 * ```
 * @param names
 */
export function getVar<T extends string>(names: T[]): Record<T, string>;

/**
 * Get Root variables as map from Alias Map
 * @example
 * Get {FOO: '--foo', BAR, :'--bar'}
 *
 * ```js
 * getVar({FOO: 'foo', BAR: 'bar']);
 * ```
 * @param aliasedNames
 */
export function getVar<T extends string>(aliasedNames: Record<T, string>): Record<T, string>;

/**
 * Get Element variable
 * @example
 * Get `--var-name`
 * ```js
 * getVar(document.documentElement, 'varName');
 * ```
 * @param element
 * @param name
 */
export function getVar(element: HTMLElement, name: string): string;
/**
 * get Element Variables as map from Array
 * @example
 * Get {foo: '--foo', bar, :'--bar'}
 *
 * ```js
 * getVar(document.documentElement, ['foo', 'bar']);
 * ```
 * @param element
 * @param names
 */
export function getVar<T extends string>(element: HTMLElement, names: T[]): Record<T, string>;

/**
 * get Element Variables as map from Alias Map
 * @example
 * Get {FOO: '--foo', BAR, :'--bar'}
 *
 * ```js
 * getVar(document.documentElement, {FOO: 'foo', BAR: 'bar']);
 * ```
 * @param element
 * @param aliasedNames
 */
export function getVar<T extends string>(element: HTMLElement, aliasedNames: Record<T, string>): Record<T, string>;

export function getVar(element_or_name, names?) {
	let element = element_or_name as HTMLElement;
	if (typeof element_or_name === 'string') {
		names   = element_or_name;
		element = document.documentElement;
	}
	const computedStyle = getComputedStyle(element);

	if (Array.isArray(names)) {
		const map   = {};
		let current = names.length;
		while (--current > 0) {
			const name = names[current];
			map[name]  = computedStyle.getPropertyValue(getVarName(name)).trim()
		}
		return map;
	}

	if (typeof names === 'object') {
		const map = {};
		for (let key in names) {
			const name = names[key];
			map[key]   = computedStyle.getPropertyValue(getVarName(name)).trim()
		}
		return map;
	}

	return computedStyle.getPropertyValue(getVarName(names)).trim();
}