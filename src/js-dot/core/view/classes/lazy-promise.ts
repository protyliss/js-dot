import {LazyPromiseBase} from './lazy-promise-base';

/**
 * Execute after declare then method
 * @alpha
 */
export class LazyPromise<T = unknown> extends LazyPromiseBase<T> {
    protected _executor: (resolve: (value: (PromiseLike<T> | T)) => void, reject: (reason?: any) => void) => void;

    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
        super();
        this._executor = executor;
    }

    protected _getPromise(): Promise<T> {
        return new Promise(this._executor);
    }
}
