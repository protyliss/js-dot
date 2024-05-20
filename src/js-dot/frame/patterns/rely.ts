import {isEmpty} from '@js-dot/core';
import {FRAME_LOG} from '../frame-log';
import {inspectToken} from '../functions/_inspect-token';
import {inspectTokens} from '../functions/_inspect-tokens';
import {ReliableOption} from '../typings/reliable-option';
import {RelyifyOption} from '../typings/relyify-option';

const {isArray: IS_ARRAY} = Array;

const RELY_CONSTRUCTING_CLASSES: object[] = [];
const RELYED_VALUE_MAP                    = new Map();
const RELIABLE_MAP                        = new Map();
const RELIABLY_PROMISE_RESOLVERS          = new Map<any, Set<Function>>();
const PRIMARY_TOKENS                      = new Map();

let INDEX = 0;

/**
 * @example
 * ```ts
 * interface FooInterface {
 * }
 *
 * class FooImplementor implements FooInterface {
 * }
 *
 * const FOO_TOKEN = new RelyToken<FooInterface>();
 *
 * relyify({
 * 	token: FOO_TOKEN,
 * 	class: FooImplementor
 * });
 *
 * // Returns FooInterface
 * const foo = rely(FOO_TOKEN);
 *
 * ```
 *
 * @group rely-ify
 */
export class RelyToken<T_RETURN = any> {
	readonly [Symbol.toStringTag] = 'RelyToken';
	protected readonly index      = INDEX++;

	constructor(protected description?: string) {
	}

	/**
	 * Same as `rely(RelyToken)`
	 *
	 * @see rely
	 */
	get rely() {
		return rely(this);
	}

	/**
	 * Same as `reliabled(RelyToken)`
	 *
	 * @see reliabled
	 */
	get reliabled() {
		return reliabled(this);
	}

	/**
	 * Same as `reliably(RelyToken)`
	 *
	 * @see reliably
	 */
	get reliably() {
		return reliably(this);
	}

	toString() {
		return `RelyToken<${this.description}(${this.index})>`;
	}
}

/**
 * Alias of `new RelyToken(description)`
 * @see RelyToken
 * @param description
 *
 * @group rely-ify
 */
export function relyToken(description: string) {
	return new RelyToken(description);
}

/**
 * Set token for use to `rely` function.
 *
 * @example
 * relyify({
 *   token: 'Foo',
 *   class: class Foo {
 *
 *   }
 * });
 *
 * @param option
 *
 * @group rely-ify
 */
export function relyify(option: { token: string | object | Array<string | object>, class: RelyifyOption['class'] });
/**
 * Set token for use to `rely` function.
 *
 * @example
 * class Foo {
 *
 * }
 *
 * class FooV2 {
 *
 * }
 *
 * relyify({
 *     token: Foo,
 *     class: FooV2
 * })
 *
 * @param option
 *
 * @group rely-ify
 */
export function relyify(option: { token: (new(...args: any) => any), class?: RelyifyOption['class'] });
/**
 * Set token for use to `rely` function.
 *
 * @example
 * relyify({
 *    token: 'host',
 *    value: '127.0.0.1',
 *    multiple: true
 * });
 *
 * relyify({
 *    token: 'host',
 *    value: 'localhost',
 *    multiple: true
 * });
 *
 * // Returns ['host', 'localhost']
 * rely('host');
 *
 * @param option
 *
 * @group rely-ify
 */
export function relyify(option: {
	token: RelyifyOption['token'],
	value: RelyifyOption['value'],
	multiple?: RelyifyOption['multiple']
});

/**
 *
 * @example
 * relyify({
 *     token: 'port',
 *     value: 80
 * });
 *
 * // throw Error
 * relyify({
 *    token: 'port',
 *    value: 8080
 * });
 * @param option
 */
export function relyify(option: { token: string | object | Array<string | object>, value: RelyifyOption['value'] })
/**
 * Set token for use to `rely` function.
 *
 * @example
 * relyify({
 *     token: 'random',
 *     factory: () => {
 *     	return Math.random()
 *     }
 * });
 *
 * // Returns Math.random()
 * rely('random');
 *
 * @param option
 *
 * @group rely-ify
 */
export function relyify(option: {
	token: string | object | Array<string | object>,
	factory: RelyifyOption['factory'],
	multiple?: RelyifyOption['multiple']
})
export function relyify(option: RelyifyOption) {
	let {token} = option;

	if (isEmpty(token)) {
		throw new SyntaxError('[js.dev] relyify required token property');
	}

	if (!IS_ARRAY(token)) {
		token = [token];
	}

	FRAME_LOG.relyify(`relyify( ${inspectTokens(token)} )`);

	const primaryToken = token[0];

	if ('value' in option) {
		RELYED_VALUE_MAP.set(primaryToken, option.value);
		return;
	}

	if (!option.factory && !option.class && !option.value) {
		switch (typeof primaryToken) {
			case 'object':
			case 'function':
				break;
			default:
				throw new SyntaxError('[js.dev] If factory, class and value is null. using first to make reliable class, So first should be a constructor')
		}

		option.class = primaryToken;
	}

	if (option.multiple) {
		if (RELIABLE_MAP.has(primaryToken)) {
			const values = RELIABLE_MAP.get(primaryToken);
			if (!Array.isArray(values)) {
				throw new SyntaxError(`[js.dev] ${primaryToken} was rely-ify-ed as not a multiple first already`);
			}
			values[values.length] = primaryToken;
		} else {
			RELIABLE_MAP.set(primaryToken, [option]);
		}
	} else {
		if (!option.class && RELIABLE_MAP.has(primaryToken)) {
			throw new SyntaxError(`[js.dev] ${primaryToken} is not a multiple first`);
		}

		RELIABLE_MAP.set(primaryToken, option);
	}

	if (RELIABLY_PROMISE_RESOLVERS.has(primaryToken)) {
		const relied = rely(primaryToken);
		const item   = RELIABLY_PROMISE_RESOLVERS.get(primaryToken);
		if (item) {
			for (const resolve of item.values()) {
				resolve(relied);
			}
			RELIABLY_PROMISE_RESOLVERS.delete(primaryToken);
		}
	}

	let current = token.length;
	while (current-- > 0) {
		PRIMARY_TOKENS.set(token[current], primaryToken);
	}
}

/**
 * Get Singleton Instance with Constructor Argument
 */
export function rely<T, A>(tokenClass: new(a: A) => T, args?: [A]): T;
/**
 * Get Singleton Instance with Constructor Two Arguments
 */
export function rely<T, A, B>(tokenClass: new(a: A, b: B) => T, args?: [A, B]): T;
/**
 * Get Singleton Instance with Constructor Three Arguments
 */
export function rely<T, A, B, C>(tokenClass: new(a: A, b: B, c: C) => T, args?: [A, B, C]): T;
/**
 * Get Singleton Instance with Constructor Four Arguments
 */
export function rely<T, A, B, C, D>(tokenClass: new(a: A, b: B, c: C, d: D) => T, args?: [A, B, C, D]): T;
/**
 * Get Singleton Instance with Constructor Five Arguments
 */
export function rely<T, A, B, C, D, E>(tokenClass: new(a: A, b: B, c: C, d: D, e: E) => T, args?: [A, B, C, D, E]): T;


/**
 * Get Singleton Instance
 * @param tokenClass
 */
export function rely<T>(tokenClass: new(...args: any) => T): T;

/**
 * Get Singleton Instance from RelyToken
 *
 * @example
 * ```js
 * const fooToken = new RelyToken();
 * const fooValue = Math.random();
 *
 * // make rely-able
 * relyify({ token: fooToken, value: fooValue });
 *
 * // get fooValue
 * rely(fooToken);
 * ```
 *
 * @param token
 */
export function rely<T extends RelyToken>(token: T): T extends RelyToken<infer U> ? U : any;

/**
 * Get Singleton Instance as Generic from any token
 * @param token
 */
export function rely<T>(token: any): T;

/**
 * @param token
 * @param args
 *
 * @group rely
 */
export function rely(token, args?) {
	switch (token) {
		case undefined:
		case null:
		case true:
		case false:
			throw new RangeError(`[js.dev] rely token should not be a undefined, null and boolean`);
	}

	let primaryToken = PRIMARY_TOKENS.get(token);

	if (!primaryToken) {
		// todo: block option the not reliable token
		primaryToken = token;
	}

	if (RELYED_VALUE_MAP.has(primaryToken)) {
		return RELYED_VALUE_MAP.get(primaryToken);
	}

	const relyingIndex = RELY_CONSTRUCTING_CLASSES.length;

	// F word. React Injecting It-self.
	if (RELY_CONSTRUCTING_CLASSES.includes(primaryToken)) {
		// if (RELY_CONSTRUCTING_CLASSES.includes(primaryToken) && RELY_CONSTRUCTING_CLASSES[relyingIndex - 1] !== primaryToken) {
		throw new SyntaxError(`[js.dev] ${inspectRelyingPath(primaryToken)} in Recursive Injection`);
	}


	let result;
	let target = primaryToken;
	if (primaryToken instanceof RelyToken || typeof primaryToken === 'string') {
		if (!reliabled(primaryToken)) {
			const error = new SyntaxError(`[.dev] ${primaryToken} is not a reliable token`);
			globalThis['process'] && console.debug(error.stack);
			throw error;
		}
		const reliableTarget = RELIABLE_MAP.get(primaryToken);

		if (target.factory) {
			result = target.factory();
			if (!reliableTarget.multiple) {
				RELYED_VALUE_MAP.set(primaryToken, result);
			}

			return result;
		}

		target = reliableTarget.class;
	}

	RELY_CONSTRUCTING_CLASSES[relyingIndex] = primaryToken;

	FRAME_LOG.rely('rely(', inspectRelyingPath(), ')');

	if (IS_ARRAY(args)) {
		result = new target(...args);
	} else if (!target.length) {
		result = new target();
	} else {
		throw new SyntaxError(`[.dev] ${inspectRelyingPath()} Required ${target.length} Arguments for first relying`);
	}

	// if (FrameLogger.rely && FrameLogger.rely === 'group') {
	// 	FRAME_LOG.enable && FRAME_LOG.groupEnd();
	// }

	RELY_CONSTRUCTING_CLASSES.pop();
	RELYED_VALUE_MAP.set(primaryToken, result);

	return result;
}

/**
 *
 * @param option
 *
 * @group rely-ify
 */
function reliable(option: string | ReliableOption) {
	throw new Error('reserved for `Reliable` as ESM standard decorator');
}

/**
 * Returns a boolean indicating whether reliable target with the specified provide token exists
 *
 * @example
 * ```js
 * relyify({
 *  token: 'foo',
 *  class: class {}
 * })
 *
 * if(reliabled('foo')){
 *  // run
 * }
 *
 * if(reliabled('bar')){
 *  // not run
 * }
 * ```
 * @param token
 *
 * @group rely
 */
export function reliabled(token: any): boolean {
	return RELIABLE_MAP.has(PRIMARY_TOKENS.get(token));
}

/**
 * Test tokens to rely-ify
 *
 * @param token_or_tokens
 *
 * @group rely-ify
 */
export function relyifiable(token_or_tokens: any): boolean {
	const tokens = IS_ARRAY(token_or_tokens) ? token_or_tokens : [token_or_tokens];

	let current = tokens.length;
	while (current-- > 0) {
		const token        = tokens[current];
		const primaryToken = PRIMARY_TOKENS.get(token);
		if (RELIABLE_MAP.has(primaryToken) && !RELIABLE_MAP.get(primaryToken).override) {
			return false;
		}
	}

	return true;
}

type R<T> = T extends string ? any : T;

/**
 * Promised `rely` after be relyified single token in array.
 * @param tokens
 *
 * @group rely
 */
export function reliably<A>(tokens: [A]): Promise<[R<A>]>;
/**
 * Promised `rely` after be relyified 2 tokens are in array.
 * @param tokens
 *
 * @group rely
 */
export function reliably<A, B>(tokens: [A, B]): Promise<[R<A>, R<B>]>;
/**
 * Promised `rely` after be relyified 3 token are in array.
 * @param tokens
 *
 * @group rely
 */
export function reliably<A, B, C>(tokens: [A, B, C]): Promise<[R<A>, R<B>, R<C>]>;
/**
 * Promised `rely` after be relyified 4 tokens are in array.
 * @param tokens
 *
 * @group rely
 */
export function reliably<A, B, C, D>(tokens: [A, B, C, D]): Promise<[R<A>, R<B>, R<C>, R<D>]>;
/**
 * Promised `rely` after be relyified 5 tokens are in array.
 * @param tokens
 *
 * @group rely
 */
export function reliably<A, B, C, D, E>(tokens: [A, B, C, D, E]): Promise<[R<A>, R<B>, R<C>, R<D>, R<E>]>;
/**
 * Promised `rely` after be relyified string token
 *
 * @example
 * ```js
 * // Run after processed below code blocks
 * reliably('foo').then(foo => {
 *    foo.test();
 * });
 *
 * // relyify and Run above callback method.
 * relyify({
 *     token: 'foo',
 *     class: class {
 *         test(){
 *         }
 *     }
 * });
 *
 * // Run immediately
 * reliably<Foo>('foo').then(foo => {
 *    foo.test();
 * });
 * ```
 * @param token
 *
 * @group rely
 */
export function reliably<T = any>(token: string): Promise<T>;
/**
 * Promised `rely` after be provided
 *
 * @example
 * ```js
 * class Foo {
 *     test(){
 *     }
 * }
 *
 * // Does not Run
 * reliably(Foo).then(foo => {
 *    foo.test();
 * });
 *
 * // relyify and Run above callback method.
 * relyify({token: Foo});
 *
 * // Run immediately
 * reliably(Foo).then(foo => {
 *    foo.test();
 * });
 * ```
 * @param token
 *
 * @group rely
 */
export function reliably<T>(token: T): Promise<T>;

/**
 *
 * @param token
 *
 * @group rely
 */
export function reliably(token) {
	if (Array.isArray(token)) {
		const promises: Promise<any>[] = [];
		const end                      = token.length;
		let current                    = -1;
		while (++current < end) {
			promises[promises.length] = reliably(token[current]);
		}
		return Promise.all(promises);
	}

	// token = PRIMARY_TOKENS.get(token) || token;

	if (reliabled(token)) {
		return Promise.resolve(rely(token as any));
	}

	return new Promise(resolve => {
		if (RELIABLY_PROMISE_RESOLVERS.has(token)) {
			RELIABLY_PROMISE_RESOLVERS.get(token)?.add(resolve);
		} else {
			RELIABLY_PROMISE_RESOLVERS.set(token, new Set([resolve]));
		}
	});
}

/**
 * @alias relyify
 * @see relyify
 */
export const relify = relyify;

/**
 * @alias reliabled
 * @see reliabled
 */
export const relyabled = reliabled;

/**
 * @alias reliably
 * @see reliably
 */
export const relyably = reliably;


function inspectRelyingPath(currentRelyTarget?) {
	if (currentRelyTarget) {
		RELY_CONSTRUCTING_CLASSES[RELY_CONSTRUCTING_CLASSES.length] = currentRelyTarget;
	}
	return RELY_CONSTRUCTING_CLASSES.map(inspectToken)
		.reverse()
		.join(' <- ');
}