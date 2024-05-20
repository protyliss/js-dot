import {_TRUE_LIKE} from '../../constants/regex';

export function toBoolean(target: any) {
    switch (typeof target) {
        case 'boolean':
            return target;
        case 'string':
            return _TRUE_LIKE.test(target as string);
        case 'number':
            return target > 0;
        case 'function':
            return true;
        case 'object':
            for (const propertyName in target) {
                return true;
            }
            return false;
    }

    if (Array.isArray(target)) {
        return target.length > 0;
    }

    return false;
}
