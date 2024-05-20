/**
 * @alpha
 */
export abstract class LazyPromiseBase<T = unknown> implements PromiseLike<T> {
    protected _onRejected: Array<(reason: any) => any> = [];
    protected _onFinally: Array<() => void> = [];

    protected abstract _getPromise(): Promise<T>;

    then<TResult1 = T, TResult2 = never>(
        onFulFilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {

        let promise = this._getPromise();

        const {_onRejected, _onFinally} = this;

        while (_onRejected.length) {
            promise = promise.catch(_onRejected.shift());
        }

        while (_onFinally.length) {
            promise = promise.finally(_onFinally.shift());
        }

        return promise.then(onFulFilled, onRejected);
    }

    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult> | undefined | null)): Promise<T | TResult> {
        if (onRejected) {
            const {_onRejected} = this;
            _onRejected[_onRejected.length] = onRejected;
        }
        return this as any;
    }

    finally(onFinally?: (() => void) | undefined | null): Promise<T> {
        if (onFinally) {
            const {_onFinally} = this;
            _onFinally[_onFinally.length] = onFinally;
        }
        return this as any;
    }
}
