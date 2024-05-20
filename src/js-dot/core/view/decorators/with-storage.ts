// import {casting} from '@js-dot/core';
//
// // fix: build.ts error
// if (!globalThis['localStorage']) {
//     globalThis['localStorage'] = globalThis['sessionStorage'] = undefined as any;
// }
//
// export interface FromOption {
//     /**
//      * Storage Key
//      * @default class and property name
//      */
//     key?: string;
//
//     /**
//      * Use URL for generate auto storage key
//      * @default false
//      */
//     useUrl?: boolean;
//
//     /**
//      * Default Value when Storage has not a Value.
//      * @default null
//      */
//     defaultValue?: any;
// }
//
// function withStorageFactory(storage: typeof localStorage | typeof sessionStorage) {
//     return function (defaultValue_or_option?: boolean | number | string | FromOption): any {
//         let option = defaultValue_or_option as FromOption;
//
//         if (arguments.length && typeof option !== 'object') {
//             option = {
//                 defaultValue: option
//             };
//         }
//
//         return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
//             const key = getFromKey(target, propertyKey, option);
//
//             const storeValue = storage.getItem(key);
//
//             if (storeValue === null && option && option.hasOwnProperty('defaultValue')) {
//                 storage.setItem(key, option.defaultValue);
//             }
//
//             function setter(value) {
//                 switch (value) {
//                     case null:
//                     case undefined:
//                         storage.removeItem(key);
//                         break;
//                     default:
//                         storage.setItem(key, value);
//                 }
//             }
//
//             function getter() {
//                 return casting(storage.getItem(getFromKey(target, propertyKey, option)));
//             }
//
//             if (!descriptor) {
//                 return {
//                     set: setter,
//                     get: getter,
//                     enumerable: true,
//                     configurable: true
//                 };
//             }
//
//             const {set, get} = descriptor;
//
//             descriptor.set = function (value) {
//                 setter(value);
//                 set.call(this, value);
//             }
//
//             descriptor.get = function () {
//                 return getter();
//             }
//
//             return descriptor;
//         }
//     }
// }
//
// export function getFromKey(target, propertyKey: string, option?: FromOption) {
//     if (option?.key) {
//         return option.key;
//     }
//
//     let key = '@With:' + target.constructor.name + '_' + propertyKey;
//     if (option?.useUrl && globalThis['location']) {
//         key += '_' + (globalThis['location']['href'] || '');
//     }
//
//     return key;
// }
//
// /**
//  * Synchronize Property Value with localStorage
//  *
//  * @description
//  * Do not set Initialize value to property. It will overwrite value of it per reload.
//  * Use `defaultValue` option for this case.
//  *
//  * @example
//  * ```js
//  * class Foo {
//  *    @WithLocal()
//  *  $$foo;
//  *
//  *    @WithLocal()
//  *  $$bar = 1
//  * }
//  * ```
//  *
//  */
// export const WithLocal = withStorageFactory(localStorage);
//
// /**
//  * Synchronize Property Value with sessionStorage
//  *
//  * @description
//  * Do not set Initialize value to property. It will overwrite value of it per reload.
//  * Use `defaultValue` option for this case.
//  *
//  * @example
//  * ```js
//  * class Foo {
//  *    @WithSession()
//  *  $$foo;
//  *
//  *    @WithSession()
//  *  $$bar = true;
//  * ```
//  *
//  */
// export const WithSession = withStorageFactory(sessionStorage);


export default null;