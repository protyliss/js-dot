import {StyleDeclareLike} from './_style-declare-like';
import {fromSearchString} from './from-search-string';


/**
 * Get Object from UsvObject
 *
 * @param target
 */
export function fromUsvObject(target: StyleDeclareLike): Record<string, any> {
	const type = typeof target;
	switch (type) {
		case 'string':
			return fromSearchString(target as string);

		case 'function':
		case 'number':
			return TypeError(type + ' is cannot be USV Object');
	}

	if (Array.isArray(target)) {
		return Object.fromEntries(target);
	}

	return (target || {}) as Record<string, any>;
}
