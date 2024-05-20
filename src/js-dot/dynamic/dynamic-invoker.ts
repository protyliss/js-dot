import {Dynamic} from './dynamic';

export type DynamicInvoker<T> =
	Dynamic<T>
	& (() => T)
	& ((value: T) => void);

/**
 * Dynamic value for reactive to compose
 * @example
 * const foo = dynamic('apple');
 * // print apple
 * console.log(foo());

 * foo('pineapple')
 * // print pineapple
 * console.log(foo());

 * @param defaults
 */
export function dynamic<T>(defaults: T) {
	const dynamic = new Dynamic(defaults);

	function dynamicInvoker(value?: T) {
		return arguments.length ?
			dynamic.set(value) :
			dynamic.get()
	}

	Object.defineProperties(dynamicInvoker, {
			constructor: {
				value: Dynamic
			},
			set: {
				value: Dynamic.prototype.set
			},
			get: {
				value: Dynamic.prototype.get
			},
			reset: {
				value: Dynamic.prototype.reset
			},
			previousValue: {
				get(): T {
					return dynamic.previousValue;
				}
			},
			value: {
				set(value: T) {
					return dynamic.set(value);
				},
				get(): T {
					return dynamic.value;
				}
			},
			changed: {
				get(): boolean {
					return dynamic.changed;
				}
			}
		} satisfies Record<'constructor' | keyof Dynamic<T>, PropertyDescriptor>
	)

	return dynamicInvoker as DynamicInvoker<T>;
}