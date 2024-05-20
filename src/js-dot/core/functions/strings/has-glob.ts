const _GLOB_OPERATOR = /[?*[{]/;

/**
 * Check string has glob operator
 * @param value
 */
export function hasGlob(value: string){
    return typeof value === 'string' ?
        _GLOB_OPERATOR.test('' + value) :
        false;
}