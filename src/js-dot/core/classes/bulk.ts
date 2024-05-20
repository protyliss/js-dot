import {
	ExtractMethod,
	ExtractMethodWithoutParameters,
	WeakenParameters,
	WeakenReturnType
} from '../typings/core-typings';

/**
 * Bulk operation to same instances as Set
 *
 */
export class Bulk<TObject extends object> extends Set<TObject> {

	/**
	 * Set property value to bulk set
	 *
	 * @example Default usage
	 * class Foo {
	 * 	constructor(alpha){
	 * 		this.alpha = undefined;
	 * 	}
	 * }
	 * const bulk = new Bulk;
	 *
	 * const a = new Foo;
	 * const b = new Foo;
	 *
	 * bulk.add(a);
	 * bulk.add(b);
	 *
	 * bulk.set('alpha', Math.random());
	 *
	 * @param property
	 * @param value
	 */
	set<TKey extends keyof TObject>(property: TKey, value: TObject[TKey]) {
		for (let entry of this) {
			entry[property] = value;
		}
	}

	/**
	 * Get property value from bulk set
	 *
	 * @example Default usage
	 * class Foo {
	 * 	constructor(alpha){
	 * 		this.alpha = Math.random();
	 * 	}
	 * }
	 * const bulk = new Bulk;
	 *
	 * const a = new Foo;
	 * const b = new Foo;
	 *
	 * bulk.add(a);
	 * bulk.add(b);
	 *
	 * const values = bulk.get('alpha');
	 *
	 * @param property
	 */
	get<TKey extends keyof TObject>(property: TKey) {
		const values = [];
		for (const entry of this) {
			values[values.length] = entry[property];
		}

		return values;
	}

	/**
	 * Apply method that has arguments to bulk set
	 *
	 * @example Default usage
	 * class Foo {
	 *     a(){
	 *
	 *     }
	 * }
	 *
	 * const bulk = new Bulk<Foo>(new Foo, new Foo);
	 *
	 * bulk.apply('a');
	 *
	 * @see Function.apply
	 *
	 * @param property
	 * @param args
	 */
	apply<T extends ExtractMethod<TObject>, U extends keyof T>(
		property: U,
		args: WeakenParameters<T[U]>
	): WeakenReturnType<T[U]>[];
	/**
	 * Apply methods to bulk set
	 *
	 * @example Default usage
	 * class Foo {
	 *     b(value){
	 *
	 *     }
	 * }
	 *
	 * const bulk = new Bulk<Foo>(new Foo, new Foo);
	 *
	 * bulk.apply('b', [Math.random()]);
	 *
	 * @see Function.apply
	 *
	 * @param property
	 */
	apply<T extends ExtractMethodWithoutParameters<TObject>, U extends keyof T>(
		property: U
	): WeakenReturnType<T[U]>[];
	/**
	 *
	 */
	apply(property: string, args?: any[]): any {
		const returns = [];
		for (const entry of this) {
			returns[returns.length] = entry[property].apply(entry, args);
		}
		return returns;
	}

	/**
	 * Call method that has arguments to bulk set
	 *
	 * @example Default usage
	 * class Foo {
	 *     a(){
	 *
	 *     }
	 * }
	 *
	 * const bulk = new Bulk<Foo>(new Foo, new Foo);
	 *
	 * bulk.call('a');
	 *
	 * @see Function.call
	 *
	 * @param property
	 * @param args
	 */
	call<T extends ExtractMethod<TObject>, U extends keyof T>(
		property: U,
		...args: WeakenParameters<T[U]>
	): WeakenReturnType<T[U]>;
	/**
	 * Call method to bulk set
	 *
	 * @example Default usage
	 * class Foo {
	 *     b(value){
	 *
	 *     }
	 * }
	 *
	 * const bulk = new Bulk<Foo>(new Foo, new Foo);
	 *
	 * bulk.call('b', Math.random());
	 *
	 * @see Function.call
	 *
	 * @param property
	 */
	call<T extends ExtractMethodWithoutParameters<TObject>, U extends keyof T>(
		property: U
	): WeakenReturnType<T[U]>;
	/**
	 *
	 */
	call(property: string, ...args: any[]): any {
		const returns = [];
		for (const entry of this) {
			returns[returns.length] = entry[property].call(entry, ...args);
		}
		return returns;
	}
}