import {casting} from '@js-dot/core';
import {fromDateDigit} from '../../date/from-date-digit';
import {isDateDigit} from '../../date/is-date-digit';
import {fusion} from '../objects/fusion';
import {QUERY_KEY_AND, QUERY_KEY_VALUE_SEPARATOR, QUERY_KEYWORD_OR, QUERY_KEYWORD_SPACE} from './_search-query';

export interface FromFilterStringOption {
	types: Record<string, string>;
}

export function fromFilterString(
	filterString: string,
	option?: FromFilterStringOption
): Record<string, any> {
	// @ts-ignore
	return (fromFilterString = function (filterString, option) {
		if (!filterString) {
			return {};
		}

		const {types} = fusion(
			option,
			{
				types: {}
			}
		);

		const values = {};
		const end    = filterString.length;
		let current  = -1;
		let state    = true;
		let key      = '';
		let value    = '';
		while (++current < end) {

			const char = filterString.charAt(current);

			if (state) {
				switch (char) {
					case QUERY_KEY_VALUE_SEPARATOR:
						state = false;
						break;
					default:
						key += char;
				}
			} else {
				switch (char) {
					case QUERY_KEY_AND:
						values[key] = castingWithTimestamp(types, key, value);
						state       = true;
						key         = '';
						value       = '';
						continue;
					case QUERY_KEYWORD_OR:
						value += ', ';
						continue;
					case QUERY_KEYWORD_SPACE:
						value += ' ';
						continue;
					default:
						value += char;
				}
			}
		}

		if (key && value) {
			values[key] = castingWithTimestamp(types, key, value);
		}

		return values;
	}).apply(this, arguments);

	function castingWithTimestamp(types: Record<string, string>, key: string, value: string) {
		switch (types[key]) {
			case 'date':
				return fromDateDigit(value)
			case 'text':
			case 'search':
				return value;
			case 'number':
				return +value;
		}

		if (isDateDigit(value)) {
			return fromDateDigit(value);
		}

		return casting(value);
	}
}
