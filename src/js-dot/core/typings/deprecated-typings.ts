import {ExtractMember, ExtractMethod, ExtractProperty} from './core-typings';

/**
 * @deprecated Renamed to ExtractMethod<T>
 */
export type FunctionProperty<T extends object> = ExtractMethod<T>;

/**
 * @deprecated Renamed to ExtractProperty<T>
 */
export type NonFunctionProperty<T extends object> = ExtractProperty<T>;

/**
 * @deprecated Use, keyof ExtractMethod<T>
 */
export type FunctionPropertyName<T extends object> = keyof ExtractMethod<T>;

/**
 * @deprecated Use, keyof ExtractProperty<T>
 */
export type NonFunctionPropertyName<T extends object> = keyof ExtractProperty<T>;

/**
 * @deprecated Use, keyof ExtractMember<T, V>
 */
export type TypedPropertyName<T extends object, V> = keyof ExtractMember<T, V>;

/**
 * @deprecated Use, Omit<T, V>
 */
export type ExcludeProperty<T, K extends keyof T> = Omit<T, K>;

/**
 * @deprecated Use, Omit<T, keyof V>
 */
export type ExcludePropertyFrom<T, V extends Partial<T>> = Omit<T, keyof V>;

/**
 * @deprecated Use, keyof ExtractMember<T, V>
 */
export type ExtractTypedPropertyName<T extends object, V> = keyof ExtractMember<T, V>