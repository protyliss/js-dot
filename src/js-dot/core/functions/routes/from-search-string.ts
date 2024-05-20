/**
 * @description
 * URLSearchParams was 78% slower
 * @param searchString
 */
import {casting} from '../strings/casting';

export function fromSearchString(searchString: string) {
    searchString = searchString.split('?').pop().split('#').shift();

    if (!searchString) {
        return {};
    }

    const result = {};
    const end = searchString.length;
    let current = -1;
    let char;
    let name = '';
    let value = '';
    let flag;
    while (++current < end) {
        char = searchString.charAt(current);

        if (flag) {
            if (char === '&') {
                result[name] = casting(value);
                name = '';
                value = '';
                flag = false;

            } else {
                value += char;
            }
        } else {
            switch (char) {
                case '=':
                    flag = true;
                    break;

                case '&':
                    result[name] = casting(value);
                    name = '';
                    value = '';
                    break;
                default:
                    name += char;
            }
        }
    }

    result[name] = casting(value);

    return result;
}
