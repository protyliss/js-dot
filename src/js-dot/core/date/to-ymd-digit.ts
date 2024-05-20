import {dateFormatted} from './date-formatted';
import {toDateDigit} from './to-date-digit';

export function toYmdDigit(date: string | number | Date = new Date): string {
	return toDateDigit(dateFormatted('Y-m-d 00:00:00.0', date));
}
