import {DotSelectOption} from '../interfaces/form-select';
import {toSelectOption} from './to-select-options';
import {isJsonString} from '@js-dot/core';

/**
 * Options from Multiple lined String Expression
 * @param optionString
 */
export function fromOptionString(optionString: string): DotSelectOption[] {
	const options = [];

	if (!optionString) {
		return options;
	}

	optionString = optionString.trim();

	if (isJsonString(optionString)) {
		return toSelectOption(JSON.parse(optionString));
	}

	optionString = optionString.trim();

	const end   = optionString.length;
	let current = -1;
	let stack   = '';
	let value   = '';

	while (++current < end) {
		const char = optionString.charAt(current);

		switch (char) {
			case ':':
				value = stack;
				stack = '';
				continue;
			case ';':
			case '\n':
			case '\r':
				if (!stack) {
					continue;
				}
				const trimmedStack      = stack.trim();
				const trimmedValue      = value ? value.trim() : trimmedStack;
				options[options.length] = {
					value: trimmedValue || trimmedStack,
					text: trimmedStack || trimmedValue
				};
				stack                   = '';
				value                   = '';
				continue;
		}
		stack += char;
	}

	if (stack) {
		const trimmedStack      = stack.trim();
		const trimmedValue      = value ? value.trim() : trimmedStack;
		options[options.length] = {
			value: trimmedValue || trimmedStack,
			text: trimmedStack || trimmedValue
		};
	}

	return options;
}
