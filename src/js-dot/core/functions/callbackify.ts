import {isPromise} from './is-promise';

/**
 * Call Callback whether it is a Promise, function or not
 *
 * @example
 * ```js
 * function callback(error, value){
 *      if(error){
 *          console.error(error);
 *      }else{
 *          console.log(value)
 *      }
 * }
 * }
 *
 * // log 'a'
 * callbackify('a', callback);
 *
 * // log 'b'
 * callbackify(() => 'b', callback);
 *
 * // log 'c'
 * callbackify(Promise.resolve('c'), callback);
 * ```
 * @param target
 * @param callback
 */
export function callbackify<T>(target: PromiseLike<T> | (() => T) | T, callback: (error: any, value: T) => void) {
    if (target) {
        if (isPromise(target)) {
            (target as Promise<T>)
                .then(
                    value => {
                        callback(undefined, value);
                    },
                    reason => {
                        callback(reason, undefined);
                    }
                )
        } else if (typeof target === 'function') {
            try {
                callback(undefined, (target as (() => T))());
            } catch (reason) {
                callback(reason, undefined);
            }
        } else {
            callback(undefined, target as T);
        }
    } else {
        callback(undefined, target as T);
    }
}
