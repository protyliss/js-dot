//@formatter:off
const extendStatics = Object.setPrototypeOf
	|| ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; })
	|| function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
//@formatter:on

const ONLY_ONE_CONSTRUCTED = new Set();

/**
 * Class construct limit to only once
 * @version stage 2
 * @example
 * ```ts
 * @OnlyOne
 * class Foo {
 *
 * }
 *
 * const a = new Foo();
 * const b = new Foo(); // Throw Error
 * ```
 */
export function OnlyOne<T extends new(...args) => any>(Base: T) {
	// let constructed = false;
	// return class OnlyOneClass extends Base {
	// 	constructor(...args: any[]) {
	// 		super(...(() => {
	// 			if (constructed) {
	// 				throw new SyntaxError(`Class ${Base.name} cannot construct anymore.`);
	// 			}
	// 			constructed = true;
	// 			return args;
	// 		})());
	// 	}
	// } as T;

	function OnlyOneClass(...args: any[]) {
		if (ONLY_ONE_CONSTRUCTED.has(this)) {
			throw new SyntaxError(`Class ${Base.name} cannot construct anymore.`);
		}
		ONLY_ONE_CONSTRUCTED.add(this);
		return new Base(...args) || this;
	}

	extendStatics(OnlyOneClass, Base);
	OnlyOneClass.prototype = Base.prototype;

	return OnlyOneClass as any as T;
}