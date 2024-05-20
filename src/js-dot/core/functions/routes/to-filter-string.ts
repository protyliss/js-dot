import {toDateDigit} from '@js-dot/core/date';

const {keys: KEYS} = Object;
const {isArray} = Array;

function toFilterKeyword(value: string | number | Date | Array<string | number | Date>) {
    switch (typeof value) {
        case 'string':
            return encodeFilterKeyword(value)
        case 'number':
        case 'boolean':
            return '' + value
    }

    if (isArray(value)) {
        if (value.length === 2) {
            const [begin, end] = value;
            if (begin instanceof Date || end instanceof Date) {
                return `${begin ? toDateDigit(begin) : ''}~${end ? toDateDigit(end) : ''}`
            }
        }

        return value.map(toFilterKeyword).join(','); // FILTER_KEYWORD_OR
    }

    if (value instanceof Date) {
        return toDateDigit(value);
    }

    return value;
}

function encodeFilterKeyword(keyword: string) {
    keyword = keyword.trim();
    const end = keyword.length;
    let current = -1;
    let result = '';

    if (end > 4) {
        if (keyword.substr(0, 4) === 'NOT ') {
            result += '!';
            current = 3;
        }
    }

    while (++current < end) {
        const char = keyword.charAt(current);
		const nextChar = keyword.charAt(current + 1);

        switch (char) {
            case ' ':
                if (current > 3) {
                    const last4 = result.substr(-4);
                    if (last4.endsWith('*OR')) {
                        result = result.substr(0, result.length - 3) + ',';
                        break;
                    }

                    if (last4 === '*AND') {
                        result = result.substr(0, result.length - 4) + ':';
                        break;
                    }
                }
                // result += '*'; // FILTER_KEYWORD_SPACE
				result += '+';
                break;

            case ':': // FILTER_CONDITION_SEPARATOR, FILTER_KEYWORD_AND
            case ';': // FILTER_CONDITION_AND
            case '/': // FILTER_CONDITION_OR
            case '!': // FILTER_KEYWORD_NOT
            case '*': // FILTER_KEYWORD_SPACE
            // case ',': // FILTER_KEYWORD_OR
					result += '!' // FILTER_KEYWORD_ESCAPE
						+ char;
                break;

            default:
                result += char;
        }
    }
    return result;
}

/**
 * Get Filter String
 * @param source
 * @param forOr make condition for 'or' operation
 */
export function toFilterString(source: Record<string, number | string | Date>, forOr = false): string {
    const conditions = [];
    const keys = KEYS(source);
    const end = keys.length;
    let current = -1;

    while (++current < end) {
        const key = keys[current];
        const value = toFilterKeyword(source[key]);

        if (!value) {
            continue;
        }

        conditions[conditions.length] = key + ':' /* FILTER_CONDITION_SEPARATOR */ + value
    }

    return conditions.join(
        forOr ?
            '/' : // FILTER_CONDITION_OR
            ';' // FILTER_CONDITION_AND
    );
}
