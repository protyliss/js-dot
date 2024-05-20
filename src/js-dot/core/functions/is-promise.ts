export function isPromise(target){
    return target instanceof Promise || target && typeof target['then'] === 'function';
}
