export interface DotQuery {
    map<T extends (...args: any[])=>any>(method): ReturnType<T>;
    map<T extends (...args: any[])=>any>(method: T, args): ReturnType<T>;

    forEach(method): DotQuery;
    forEach(args, method): DotQuery;
}
