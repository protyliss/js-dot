import {Observer, SubscriptionPretender} from './rxjs-pretender';

export interface ObservableLike<T> {
	/**
	 * @see import('rxjs').Observable.subscribe
	 */
	subscribe(next: (value: T) => void): SubscriptionPretender;

	/**
	 * @see import('rxjs').Observable.subscribe
	 */
	subscribe(observer?: Partial<Observer<T>>): SubscriptionPretender;

	/**
	 * @see import('rxjs').Observable.subscribe
	 */
	subscribe(next: (value: T) => void): SubscriptionPretender;
}
