export type PromiseExecutor<T> = (resolve: (value: T | Promise<T> | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;


export abstract class PromiseExtendsBase<T> implements Promise<T> {
    [Symbol.toStringTag]: string;

    protected _basePromise: Promise<T>;
    protected _basePromiseClass: PromiseConstructor | PromiseConstructorLike;

    protected _basePromising(
        executor: PromiseExecutor<T>,
        promiseClass: PromiseConstructor | PromiseConstructorLike = Promise
    ) {
        this._basePromise = new promiseClass(
            (resolve, reject) => {
                executor(resolve, reject);
            }
        ) as Promise<T>;

        this._basePromiseClass = promiseClass;
    }

    /**
     * @inheritDoc
     * @param onfulfilled
     * @param onrejected
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2> {
        return this._basePromise.then(
            result => {
                const next = new this._basePromiseClass(
                    (resolve, reject) => {
                        resolve(onfulfilled(result));
                    }
                ) as Promise<any>

                return onrejected ?
                    next.catch(reason => {
                        return onrejected(reason);
                    }) :
                    next;
            }
        ) as any;
    }

    /**
     * @inheritDoc
     * @param onrejected
     */
    catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<T | TResult> {
        return this._basePromise.catch(onrejected) as any;
    }

    /**
     * @inheritDoc
     * @param onfinally
     */
    finally(onfinally?: () => void): Promise<T> {
        return this._basePromise.finally(onfinally);
    }
}