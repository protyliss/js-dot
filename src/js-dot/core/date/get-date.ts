import {fromTimestamp} from './from-timestamp';
import {isDateDigit} from './is-date-digit';
import {fromDateDigit} from './from-date-digit';

/**
 * Get Date from Any Date-able Expression

 * @description
 * - `Date`
 * - `number`
 *   - unix time
 * - `string`
 *   - shorten-able timestamp
 *   - date digit
 *
 * @param dateExp
 * @param forEnd autofill as end date in period
 */
export function getDate(
    dateExp: number | string | Date,
    forEnd?: boolean
) {
    if (dateExp instanceof Date) {
        return dateExp;
    }

    if (typeof dateExp === 'number') {
        if (+('' + dateExp).substring(0, 4) < (new Date()).getFullYear()) {
            return new Date(dateExp);
        }
    }

    const dateDigit = isDateDigit(dateExp);
    if (dateDigit) {
        return fromDateDigit(dateDigit, forEnd);
    }

    return fromTimestamp(dateExp as string, forEnd);
}