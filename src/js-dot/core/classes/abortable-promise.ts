import {PromiseExtendsBase, PromiseExecutor} from './promise-extends-base';

/**
 * Promise includes abort() methods.
 *
 * @beta
 * @example
 * const promise = new AbortablePromise(resolve => setTimeout(resolve, 1000))
 * 	.then(() => alert('slept'));
 *
 * // Does not happen alert
 * promise.abort();
 */
export class AbortablePromise<T> extends PromiseExtendsBase<T> {
    protected _abortController: AbortController;

    constructor(executor: PromiseExecutor<T>) {
        super();

        const abortController = new AbortController();
        this._abortController = abortController;
        this._basePromising((resolve, reject) => {
            abortController.signal.addEventListener('abort', reject);

            executor(
                (result) => {
                    if (!abortController.signal.aborted) {
                        resolve(result)
                    }
                }, reject
            );
        });
    }

	/**
	 * Invoking this method will set this Promise's aborted flag and signal to any observers that the associated activity is to be aborted.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/abort)
	 */
    abort(reason?: any): Promise<any> {
        this._abortController.abort(reason);
        return this;
    }
}