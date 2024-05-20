import {from, lastValueFrom, Observable, of, throwError} from 'rxjs';
import {isPromise} from '@js-dot/core';

/**
 * Get Observable whether it is a Observable, Promise, Function or not
 * @param target
 */
export function observify(target): Observable<any> {
	if (target instanceof Observable) {
		return target;
	}

	if (isPromise(target)) {
		return from(target);
	}

	if (typeof target === 'function') {
		try {
			return of(target());
		} catch (reason) {
			return throwError(reason);
		}
	}

	return of(target);
}
