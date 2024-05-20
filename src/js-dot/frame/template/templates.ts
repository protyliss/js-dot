import {New} from '@js-dot/core';
import {rely} from '@js-dot/frame';

export type TemplateTagToken = [string[], string[], string[]];
export type TemplateVariableGetter = (<T extends Object>(expression: string, values?: T) => any);

export abstract class TemplateTagParser {
	/**
	 * Get Tokens as like Template Literal Function's Argument
	 * @param template
	 */
	abstract getToken(template: string): TemplateTagToken;

	/**
	 * Check the template has variable expression
	 * @param template
	 */
	hasVariable(template: string) {
		return this.getVariables(template).length > 0;
	}

	/**
	 * Get Variable Names in template string
	 * @param template
	 */
	getVariables(template: string) {
		return this.getToken(template)[1];
	}
}

export abstract class TemplateEngine {
	#getter!: TemplateVariableGetter;

	/**
	 * Template Parser
	 */
	parser!: TemplateTagParser;

	/**
	 * Template Token
	 */
	token!: TemplateTagToken;

	/**
	 * Variable Names
	 */
	variableNames!: string[];

	static getString<T extends Object>(template: string, values: T) {
		return (new (this as any as New<TemplateEngine>)(template)).getString(values);
	}

	protected constructor(
		parser: TemplateTagParser | (new(...args: any[]) => TemplateTagParser),
		getter_or_template?: TemplateVariableGetter | string,
		template?: string
	) {

		this.parser = (parser.constructor.name === 'Function' ? rely(parser as any) : parser) as TemplateTagParser

		let getter = getter_or_template;

		if (typeof getter === 'string') {
			template = getter;
			getter   = null;
		}

		this.#getter = (getter as TemplateVariableGetter) || defaultGetter;

		template && this.setTemplate(template);
	}

	/**
	 * Set Template String
	 * @param template
	 */
	setTemplate(template: string) {
		this.token         = this.parser.getToken(template);
		this.variableNames = this.token[1];
	}

	/**
	 * Get Templated String
	 * @param values
	 */
	getString(values) {
		if (!this.variableNames) {
			throw new ReferenceError("Has not a template string yet.");
		}

		return getTokenizedTemplateString(
			this.#getter,
			this.token,
			values
		);
	}
}

function defaultGetter(expression, values) {
	return values[expression];
}

/**
 * Get Tokenized Template Expression Result
 * @example
 * Token is a same structure with Arguments of Template Tag Function
 *
 * ```js
 * getTokenizedTemplateString(
 *  (values, expression) => values[expression],
 *  [['prefix ', ' suffix'], ['foo']],
 *  {foo: 1}
 * );
 * ```
 *
 * ```text
 * prefix 1 suffix
 * ```
 * @param getter
 * @param token
 * @param values
 */
export function getTokenizedTemplateString<T extends Object>(
	getter: TemplateVariableGetter,
	token: TemplateTagToken,
	values?: T
) {
	const [strings, keys, interpolations] = token;
	let result                            = '';
	const end                             = strings.length - 1;
	let current                           = -1;
	while (++current < end) {
		const key   = keys[current];
		const value = getter(key, values)
		result += ''
			+ strings[current]
			+ (
				value === undefined ?
					interpolations[current] || key :
					value
			)
		;
	}

	return result + strings[end];
}
