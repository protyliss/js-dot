import {DATE_LAST_DATES} from './constants';
import {isLeapYear} from './is-leap-year';

/**
 * Get Last Date of Month
 * @param date
 */
export function getLastDate(date: Date) {
    const month = date.getMonth();

    return month === 1 ? isLeapYear(date) ? 29 : 28 : DATE_LAST_DATES[month];
}
