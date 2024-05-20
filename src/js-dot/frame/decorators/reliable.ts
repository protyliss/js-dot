import {downgradeClassDecorator} from '@js-dot/core';
import {FRAME_LOG} from '../frame-log';
import {inspectTokens} from '../functions/_inspect-tokens';
import {relyifiable, relyify, RelyToken} from '../patterns/rely';
import {ReliableOption} from '../typings/reliable-option';
import {RelyifyOption} from '../typings/relyify-option';

/**
 * Decorator version of `relyify()`
 *
 * @version stage 3
 * @see relyify
 *
 * @example rely-ify with self constructor
 * ```ts
 * @Reliable()
 * class FooService {}
 * const foo = rely<FooService>(FooService);
 * ```
 *
 * @example rely-ify with string
 * ```ts
 * @reliable({
 *     token: 'foo'
 * })
 * class FooService {}
 * const foo = rely<FooService>('foo');
 * // rely-able too
 * const foo = rely<FooService>(FooService);
 * ```
 *
 * @example rely-ify with RelyToken
 * ```ts
 * const fooToken = new RelyToken<FooService>('FooService');
 * @reliable({
 * 	token: fooToken,
 * 	selfTokenize: false
 * })
 * class FooService {}
 *
 * const foo = rely(fooToken);
 * // Cannot rely-able by false of selfTokenize
 * const foo = rely<FooService>(FooService);
 * ```
 */
export function reliable(option?: string | (new(...args: any[]) => any) | RelyToken | Partial<ReliableOption>) {
	return function reliableMetaDecorator(target: any, context: ClassDecoratorContext) {
		return function reliableDecorator(this: any) {
			const stableOption = (option && option.constructor !== Object ?
					{
						token: option
					} :
					option || {} as ReliableOption
			) as ReliableOption;

			if (!('selfTokenize' in stableOption)) {
				stableOption['selfTokenize'] = true;
			}

			const tokens = stableOption?.token ?
				Array.isArray(stableOption.token) ?
					stableOption.token :
					[stableOption.token] :
				[];

			if (stableOption.selfTokenize && tokens.indexOf(target) < 0) {
				tokens[tokens.length] = target;
			} else if (!tokens.length) {
				throw new ReferenceError(`Should be set a token when selfTokenize is false.`);
			}

			if (relyifiable(tokens)) {
				FRAME_LOG.reliable(`@reliable( ${inspectTokens(tokens)} )`);

				stableOption.token                    = tokens;
				(stableOption as RelyifyOption).class = target

				relyify(stableOption);
			} else {
				FRAME_LOG.reliable(`@reliable(${inspectTokens(tokens)}) was fail with tokens already rely-ify-ed`);
			}
		};
	};
}

/**
 * @alias reliable
 * @see Reliable
 * @version stage 2
 */
export const Reliable = downgradeClassDecorator(reliable);