import {combineLatestWith, map, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export function combineLatests$<A, B>(observables: [Observable<A>, Observable<B>], debouncing?: number): Observable<[A, B]>;
export function combineLatests$<A, B, C>(observables: [Observable<A>, Observable<B>, Observable<C>], debouncing?: number): Observable<[A, B, C]>;
export function combineLatests$<A, B, C, D>(observables: [Observable<A>, Observable<B>, Observable<C>, Observable<D>], debouncing?: number): Observable<[A, B, C, D]>;
export function combineLatests$<T>(observables: Observable<T>[], debouncing?: number): Observable<T>;
/**
 * Combine Observables as Latest Values with throttleTime
 * @param observables
 * @param debouncing
 */
export function combineLatests$(observables, debouncing = 24): Observable<any[]> {
	const first = observables[0];
	return (
		observables.length > 1 ?
			first.pipe(
				combineLatestWith(...observables.slice(1)),
				debounceTime(debouncing)
			) :
			first
				.pipe(map(value => [value]))
	) as any;
}
