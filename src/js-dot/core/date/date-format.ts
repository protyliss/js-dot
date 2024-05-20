import {DATE_LAST_DATES} from './constants';
import {DateParts} from './date-parts';
import {isLeapYear} from './is-leap-year';

const {max: MAX} = Math;

const SUFFIXES        = [null, 'st', 'nd', 'rd', 'th'];
const LAST_DATE       = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const LOWER_MERIDIEMS = ['am', 'pm', 'am'];
const UPPER_MERIDIEMS = ['AM', 'PM', 'AM'];

const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Friday',
	'Saturday'
]

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

/**
 */
abstract class DateFormat {
	//////////////////////////////
	// DAYS
	//////////////////////////////
	/**
	 * Day of the month, 2 digits with leading zeros
	 * 01 to 31
	 * @param date
	 */
	static d(date: Date) {
		return zf(date.getDate())
	}

	/**
	 * A textual representation of a day, three letters
	 * @param date
	 */
	static D(date: Date) {
		return DAYS[date.getDay()].substring(0, 3);
	}

	/**
	 * Day of the month without leading zeros
	 * 1 to 31
	 * @param date
	 */
	static j(date: Date) {
		return date.getDate();
	}

	/**
	 *    A full textual representation of the day of the week
	 *    Sunday through Saturday
	 * @param date
	 */
	static l(date: Date) {
		return DAYS[date.getDay()];
	}

	/**
	 * ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * @param date
	 */
	static N(date: Date) {
		return date.getDate() || 7;
	}

	/**
	 * English ordinal suffix for the day of the month, 2 characters
	 * st, nd, rd or th. Works well with j
	 * @param date
	 */
	static S(date: Date) {
		return SUFFIXES[MAX(4, date.getDate())];
	}

	/**
	 * Numeric representation of the day of the week
	 * 0 (for Sunday) through 6 (for Saturday)
	 * @param date
	 */
	static w(date: Date) {
		return date.getDay();
	}

	/**
	 * The day of the year (starting from 0)
	 * @param date
	 */
	static z(date: Date) {
		const m              = date.getMonth();
		let currentMonthDays = date.getDate();

		if (m) {
			currentMonthDays += DATE_LAST_DATES[m];
			if (m > 1) {
				currentMonthDays += DateFormat.L(date);
			}
		}

		return currentMonthDays;
	}

	//////////////////////////////
	// WEEK
	//////////////////////////////
	/**
	 * ISO 8601 week number of year, weeks starting on Monday
	 * Example: 42 (the 42nd week in the year)
	 */
	static W(date: Date) {
		const firstDate = new Date(date.getFullYear(), 0, 1);
		return Math.ceil(DateFormat.z(date) + firstDate.getDay()) / 7;
	}

	//////////////////////////////
	// MONTH
	//////////////////////////////

	/**
	 *    A full textual representation of a month, such as January or March
	 *  January through December
	 * @param date
	 * @constructor
	 */
	static F(date: Date) {
		return MONTHS[date.getMonth()];
	}

	/**
	 * Numeric representation of a month, with leading zeros
	 *    01 through 12
	 * @param date
	 */
	static m(date: Date) {
		return zf(date.getMonth() + 1);
	}

	/**
	 *    A short textual representation of a month, three letters
	 *    Jan through Dec
	 * @param date
	 * @constructor
	 */
	static M(date: Date) {
		return MONTHS[date.getMonth()].substring(0, 3);
	}


	/**
	 * Numeric representation of a month, without leading zeros
	 *    1 through 12
	 * @param date
	 */
	static n(date: Date) {
		return date.getMonth() + 1;
	}

	/**
	 * Number of days in the given month
	 *    28 through 31
	 * @param date
	 */
	static t(date: Date) {
		const m = date.getMonth();
		return LAST_DATE[m] + (m === 1 ? DateFormat.L(date) : 0);
	}

	//////////////////////////////
	// YEAR
	//////////////////////////////

	/**
	 * Whether it's a leap year
	 * 1 if it is a leap year, 0 otherwise.
	 * @param date
	 */
	static L(date: Date) {
		return isLeapYear(date) ? 1 : 0;
	}


	/**
	 * ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.
	 * Examples: 1999 or 2003
	 */
	static o(date: Date) {
		return date.getFullYear();
	}


	/**
	 * A full numeric representation of a year, 4 digits
	 *    Examples: 1999 or 2003
	 */
	static Y(date: Date) {
		return date.getFullYear();
	}


	/**
	 * A two digit representation of a year
	 * Examples: 99 or 03
	 */
	static y(date: Date) {
		return ('' + date.getFullYear()).slice(2);
	}

	//////////////////////////////
	// Time
	//////////////////////////////

	/**
	 * Uppercase Ante meridiem and Post meridiem
	 *    am or pm
	 */
	static a(date: Date) {
		return LOWER_MERIDIEMS[Math.floor(date.getHours() / 12)];
	}

	/**
	 * Lowercase Ante meridiem and Post meridiem
	 *    AM or PM
	 */
	static A(date: Date) {
		return UPPER_MERIDIEMS[Math.floor(date.getHours() / 12)];
	}

	// B, what is it internet time?

	/**
	 * 12-hour format of an hour without leading zeros
	 *    1 through 12
	 */
	static g(date: Date) {
		return Math.floor(date.getHours() % 12);
	}


	/**
	 * 24-hour format of an hour without leading zeros
	 *    0 through 23
	 */
	static G(date: Date) {
		return date.getHours();
	}


	/**
	 * 12-hour format of an hour with leading zeros
	 *    01 through 12
	 */
	static h(date: Date) {
		return zf(Math.floor(date.getHours() % 12));
	}

	/**
	 * 24-hour format of an hour with leading zeros
	 *    00 through 23
	 */
	static H(date) {
		return zf(date.getHours());
	}

	/**
	 * Minutes with leading zeros
	 *    00 to 59
	 */
	static i(date: Date) {
		return zf(date.getMinutes());
	}


	/**
	 * Seconds with leading zeros
	 *    00 through 59
	 */
	static s(date: Date) {
		return zf(date.getSeconds());
	}


	/**
	 * Microseconds
	 * @example 654321
	 */
	static u(date: Date) {
		return date.getMilliseconds();
	}


	/**
	 * Milliseconds. Same note applies as for u.
	 * @param date
	 *    Example: 654
	 */
	static v(date: Date) {
		return date.getMilliseconds()
	}

	//////////////////////////////
	// Timezone
	//////////////////////////////
	// todo: e
	// todo: I
	// todo: O
	// todo: P
	// todo: T
	// todo: Z

	//////////////////////////////
	// Full Date/Time
	//////////////////////////////

	/**
	 * ISO 8601 date
	 * @example    2004-02-12T15:19:21+00:00
	 * @param date
	 */
	static c(date: Date) {
		const {y, m, d, h, i, s, t} = new DateParts(date);

		return `${y}-${m}-${d}T${h}:${i}:${s}`
			+ `${t > -1 ? '+' : '-'}`
			+ `${t}:00`;
	}

	// todo: r
	// todo: U
}

function zf(value) {
	return value < 10 ?
		'0' + value :
		value;
}

/**
 * Date formatting to String as like PHP Way
 * @see https://www.php.net/manual/en/datetime.format.php
 * @param format
 * @param date
 *
 */
export function dateFormat(format: string, date: string | number | Date = new Date) {
	if (!(date instanceof Date)) {
		date = new Date(date)
	}

	const end     = format.length;
	let current   = -1;
	let char;
	let converted = '';
	while (++current < end) {
		char = format.charAt(current);
		converted += DateFormat[char] ? DateFormat[char](date) : char;
	}
	return converted;
}
