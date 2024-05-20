/**
 * @see import('rxjs').Subscription
 */
export interface SubscriptionPretender {
	/**
	 * @see import('rxjs').Subscription.unsubscribe
	 */
	unsubscribe(): void;
}

/**
 * @see import('rxjs').UnaryFunction
 */
export interface UnaryFunction<T, R> {
	(source: T): R;
}

/**
 * @see import('rxjs').Observer
 */
export interface Observer<T> {
	next: (value: T) => void;
	error: (err: any) => void;
	complete: () => void;
}

/**
 * @see import('rxjs').OperatorFunction
 */
export interface OperatorFunction<T, R> extends UnaryFunction<ObservablePretender<T>, ObservablePretender<R>> {
}

/**
 * @see import('rxjs').Observable
 */
export interface ObservablePretender<T = any> {

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe(): ObservablePretender<T>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A>(op1: OperatorFunction<T, A>): ObservablePretender<A>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): ObservablePretender<B>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): ObservablePretender<C>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): ObservablePretender<D>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): ObservablePretender<E>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): ObservablePretender<F>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): ObservablePretender<G>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): ObservablePretender<H>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): ObservablePretender<I>;

	/**
	 * @see import('rxjs').Observable.pipe
	 */
	pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): ObservablePretender<unknown>;

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