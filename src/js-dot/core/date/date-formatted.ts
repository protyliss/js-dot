import {dateFormat} from './date-format';

export function dateFormatted(format: string, date: string | number | Date = new Date): Date {
    return new Date(dateFormat(format, date));
}
