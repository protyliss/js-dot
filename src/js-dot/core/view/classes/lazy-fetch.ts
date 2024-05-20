import {LazyPromiseBase} from './lazy-promise-base';

/**
 * Fetch after declare then method
 * @alpha
 */
export class LazyFetch extends LazyPromiseBase<Response> {
    protected _input: RequestInfo;
    protected _init: RequestInit;

    constructor(input: RequestInfo, init?: RequestInit) {
        super();
        this._input = input;
        this._init = init;
    }

    protected _getPromise(): Promise<Response> {
        return fetch(this._input, this._init);
    }
}

export function lazyFetch(input: RequestInfo, init?: RequestInit) {
    return new LazyFetch(input, init);
}
