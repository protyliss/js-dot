import {ObservableLike} from "./observable-like";

/**
 * Constructor
 */
export type New<T = any> = new(...args: any[]) => T;

/**
 * Extract member of T, if extends V
 *
 * @example Get String typed properties
 * // {a: string}
 * type StringMember = ExtractMember<{a: string, b: number}, string>;
 */
export type ExtractMember<T extends object, V> = {
	[K in keyof T as T[K] extends V ? K : never]: T[K];
}

/**
 * Extract member of T, if extends V
 *
 * @example Get String typed properties
 * // {b: number}
 * type NotStringMember = ExcludeMember<{a: string, b: number}, string>;
 */
export type ExcludeMember<T extends object, V> = {
	[K in keyof T as T[K] extends V ? never : K]: T[K];
}

/**
 * Include Function Properties Only
 * @example
 * class Foo {
 *     bar: string;
 *     baz(){
 *
 *     }
 * }
 *
 * // {baz(): void}
 * type FooMethod = ObjectMethod<Foo>;
 */
export type ExtractMethod<T extends object> = ExtractMember<T, Function>;

/**
 * Return interfaces with only methods that using arguments
 *
 * @example
 * class Foo {
 *     a(): void{
 *
 *     }
 *     b(arg: any): void{
 *
 *     }
 * }
 *
 * // returns {a(): void}
 * type methods = ExtractMethodWithoutParameters<Foo>;
 */
export type ExtractMethodWithoutParameters<T extends object> = {
	[K in keyof T as T[K] extends () => any ? Parameters<T[K]> extends [] ? K : never : never]: T[K]
}

/**
 * Exclude Function Properties Only
 *
 * @example
 * class Foo {
 *     bar: string;
 *     baz(){
 *
 *     }
 * }
 *
 * // {bar: string}
 * type FooProperties = ExtractProperty<Foo>;
 */
export type ExtractProperty<T extends object> = ExcludeMember<T, Function>

/**
 * Returns Parameters<T>, If T is Function
 * @see Prameters
 */
export type WeakenParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : never;

/**
 * Returns ReturnType<T>, If T is Function
 * @see ReturnType
 */
export type WeakenReturnType<T> = T extends (...args: any[]) => any ? ReturnType<T> : any;


/**
 * Make Required to Some Properties.
 *
 * @example
 * interface AllOptionals {
 * 	foo?: string;
 * 	bar?: string;
 * 	baz?: string;
 * }
 *
 * interface OnlyBazOptionals extends ToRequired<AllOptionals, 'foo' | 'bar'> {
 * 	// foo: string;
 * 	// bar: string;
 * 	// baz?: string;
 * }
 */
export type ToRequired<TRecord extends object, TKey extends keyof TRecord> =
	Omit<TRecord, TKey>
	& Required<Pick<TRecord, TKey>>;

export type Asyncable<T = any> = T | PromiseLike<T> | ObservableLike<T>;
