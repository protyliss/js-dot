/**
 * formalize select options
 * @description
 *   [a] => [{text: a, value: a}],
 *   {a: b} => [{text: a, value: b}]
 * @param options
 */
import {DotSelectOption, DotSelectOptionsLike} from '../interfaces/form-select';
import {isNumeric} from '@js-dot/core';

/**
 * Property Key Filter of toSelectOption
 */
export enum ToSelectOptionAccept {
	/**
	 * Accept All Property names
	 */
	All,
	/**
	 * Accept Property names as Number like Enum
	 */
	Number,
	/**
	 * Accept Property names as String
	 */
	String
}

/**
 * Get DotSelectOption from Options-like Value
 * @param options
 * @param accept
 */
export function toSelectOption(options: DotSelectOptionsLike, accept?: ToSelectOptionAccept): DotSelectOption[] {
	if (!options) {
		return [];
	}

	if (Array.isArray(options)) {
		if (typeof options[0] === 'object') {
			return toSelectOption(options);
		}
		return options.map(optionMapFunction);
	}
	const options_ = [];
	switch (accept) {
		case ToSelectOptionAccept.Number:
			for (let key in options) {
				if (options.hasOwnProperty(key) && isNumeric(key)) {
					options_[options_.length] = {
						text: options[key],
						value: +key
					};
				}
			}
			break;
		case ToSelectOptionAccept.String:
			for (let key in options) {
				if (options.hasOwnProperty(key) && !isNumeric(key)) {
					options_[options_.length] = {
						text: options[key],
						value: key
					};
				}
			}
			break;

		case ToSelectOptionAccept.All:
		default:
			for (let key in options) {
				if (options.hasOwnProperty(key)) {
					options_[options_.length] = {
						text: options[key],
						value: isNumeric(key) ? +key: key
					};
				}
			}
	}

	return options_;
}

function optionMapFunction(option: any) {
	switch (typeof option) {
		case 'string':
		case 'number':
			return {
				text: option,
				value: option
			}
		case "object" :
			return Object.entries(option).map(([text, value]) => {
				return {text, value}
			})[0]
	}

	return option;
}
