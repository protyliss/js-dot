import type {Observable} from 'rxjs';
import {Asyncable} from '../typings/core-typings';
import {isPromise} from './is-promise';

/**
 * Get Promise whether it is a Promise, Function or not
 * @param target
 */
export function promisify<T>(target: Asyncable<T>): Promise<T> {
	if (target) {
		if (isPromise(target)) {
			return target as Promise<T>;
		}

		if (typeof target['subscribe'] === 'function') {
			return new Promise((resolve, reject) => {
				(target as Observable<T>)
					.subscribe({
						next: response_ => {
							resolve(response_)
						},
						error: reason => {
							reject(reason);
						}
					});
			});
		}
	}

	return Promise.resolve(target as T);
}
