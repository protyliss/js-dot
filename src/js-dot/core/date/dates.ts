export type DateLike = Date | string | number;

const SUFFIXES = [null, 'st', 'nd', 'rd'];
/**
 * @todo using globals
 */
const LAST_DATE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/**
 * @todo using globals
 */
const LAST_DATE_DAYS = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const LOWER_APM = ['am', 'pm', 'am'];
const UPPER_APM = ['AM', 'PM', 'AM'];

const DAY_TIME = 86400000;

const _FIXERS = /([+-]\s*)?(\d*)\s*(min(?:utes?)?|y(?:ears?)?|m(?:on(?:ths?)?)?|d(?:ays?)?|h(?:ours?)?|i|s(?:ec(?:onds?)?)?)/ig;
const _FIXER = /([+-]\s*)?(\d*)([^\d]{1,2})/;

const _DELIMITER = /\d+[.:\-/]\d+/;

/**
 * @deprecated
 */
export class Dates extends Date {

	static readonly MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	static isLike(target) {
		return target instanceof Dates
			|| target instanceof Date
			|| (
				!!String(target).match(_DELIMITER)
				&& (new Date(target)).toString() !== 'Invalid Date'
			);
	}

	/**
	 * get dates from Dates, Date and date-able values like number, string
	 * @param date
	 */
	static by(date?: DateLike) {
		if ((date instanceof Dates)) {
			return date;
		}
		if (date instanceof Date) {
			return new Dates(date.getTime());
		}
		return date ?
			new Dates(date) :
			new Dates;
	}

	/**
	 * @alias Dates.yesterday
	 * @param date
	 */
	static yesterday(date?: DateLike);
	static yesterday(date = new Dates) {
		return Dates.by(date).yesterday();
	}

	/**
	 * @alias Dates.tomorrow
	 * @param date
	 */
	static tomorrow(date?: DateLike);
	static tomorrow(date = new Dates) {
		return Dates.by(date).tomorrow();
	}

	/**
	 * @alias Dates.firstTime
	 * @param date
	 */
	static firstTime(date?: DateLike);
	static firstTime(date = new Dates) {
		return Dates.by(date).firstTime();
	}

	/**
	 * @alias Dates.onTime
	 * @param date
	 */
	static onTime(date?: DateLike);
	static onTime(date = new Dates) {
		return Dates.by(date).onTime();
	}

	/**
	 * @alias Dates.lastTime
	 * @param date
	 */
	static lastTime(date?: DateLike);
	static lastTime(date = new Dates) {
		return Dates.by(date).lastTime();
	}

	/**
	 * @alias Dates.firstDate
	 * @param date
	 */
	static firstDate(date?: DateLike);
	static firstDate(date = new Dates) {
		return Dates.by(date).firstDate();
	}

	/**
	 * @alias Dates.lastDate
	 * @param date
	 */
	static lastDate(date?: DateLike);
	static lastDate(date = new Dates) {
		return Dates.by(date).lastDate();
	}

	static isLeapYear(date?: DateLike);
	static isLeapYear(date = new Dates) {
		const y = Dates.y(date);
		return (!(y % 4) && y % 100) || y % 400 === 0;
	}

	/**
	 * get last date of month at given month
	 * @param date
	 */
	static dates(date?: DateLike);
	static dates(date = new Dates) {
		if (typeof date === 'number' && date < 13) {
			return LAST_DATE[date - 1];
		}
		return Dates.by(date).dates();
	}


	/**
	 * @alias Dates.modify
	 */
	static modify(format: string, date?: DateLike);
	static modify(format, date = new Dates) {
		return Dates.by(date).modify(format);
	}

	/**
	 * format a local time/date
	 * @see https://www.php.net/manual/en/function.date.php
	 * @param format
	 * @param date
	 */
	static format(format: string, date?: DateLike);
	static format(format, date = new Dates) {
		const end = format.length;
		let current = -1;
		let char;
		let converted = '';
		while (++current < end) {
			char = format.charAt(current);
			converted += Dates[char] ? Dates[char](date) : char;
		}
		return converted;
	}

	/**
	 * @alias Dates.formatted
	 * @param format
	 * @param date
	 */
	static formatted(format: string, date?: DateLike);
	static formatted(format, date = new Dates) {
		return Dates.by(date).formatted(format);
	}

	/**
	 * @alias Dates.timestamp
	 * @param date
	 */
	static timestamp(date?: DateLike);
	static timestamp(date = new Dates) {
		return Dates.by(date).timestamp();
	}

	/**
	 * English ordinal suffix for the day of the month, 2 characters
	 * @param date
	 */
	static S(date?: DateLike);
	static S(date = new Dates) {
		const value = Dates.by(date).getDate();
		return value < 4 ?
			SUFFIXES[value] :
			'th';
	}

	/**
	 * 24-hour format of an hour without leading zeros
	 * @param date
	 */
	static G(date?: DateLike);
	static G(date = new Dates) {
		return Dates.by(date).getHours() % 12;
	}

	/**
	 * 12-hour format of an hour without leading zeros
	 * @param date
	 */
	static g(date?: DateLike);
	static g(date = new Dates) {
		return Math.floor(Dates.by(date).getHours() % 12);
	}

	/**
	 * Lowercase Ante meridiem and Post meridiem
	 * @param date
	 */
	static a(date?: DateLike);
	static a(date = new Dates) {
		return LOWER_APM[Math.floor(Dates.by(date).getHours() / 12)];
	}

	/**
	 * A two digit representation of a year
	 * @param date
	 */
	static y(date?: DateLike);
	static y(date = new Dates) {
		return String(Dates.by(date).getFullYear()).slice(2);
	}

	/**
	 * A full numeric representation of a year, 4 digits
	 * @param date
	 * @constructor
	 */
	static Y(date?: DateLike);
	static Y(date = new Dates) {
		return Dates.by(date).getFullYear();
	}

	/**
	 * Uppercase Ante meridiem and Post meridiem
	 * @param date
	 */
	static A(date?: DateLike);
	static A(date = new Dates) {
		return UPPER_APM[Math.floor(Dates.by(date).getHours() / 12)];
	}

	/**
	 * Whether it's a leap year
	 * @param date
	 */
	static L(date?: DateLike);
	static L(date = new Dates) {
		return Dates.isLeapYear(date) ? 1 : 0;
	}

	/**
	 * The day of the year (starting from 0)
	 * @param date
	 */
	static z(date?: DateLike);
	static z(date = new Dates) {
		date = Dates.by(date);
		let days = date.getDate();

		const m = date.getMonth();

		if (m) {
			days += LAST_DATE_DAYS[m - 1];
			if (m > 1) {
				days += Dates.L(date);
			}
		}

		return days;
	}

	/**
	 * Number of days in the given month
	 * @param date
	 */
	static t(date?: DateLike);
	static t(date = new Dates) {
		return Dates.dates(date);
	}


	/**
	 * Numeric representation of a month, without leading zeros
	 * @param date
	 */
	static n(date: DateLike);
	static n(date = new Dates) {
		return Dates.by(date).getMonth() + 1;
	}

	/**
	 * Numeric representation of a month, with leading zeros
	 * @param date
	 */
	static m(date?: DateLike);
	static m(date = new Dates) {
		return zerofill_2(Dates.by(date).getMonth() + 1);
	}


	/**
	 * Numeric representation of the day of the week
	 * @param date
	 */
	static w(date?: DateLike);
	static w(date = new Dates) {
		return Dates.by(date).getDay();
	}

	/**
	 * ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.
	 * @param date
	 */
	static o(date: DateLike);
	static o(date = new Dates) {
		return Dates.by(date).getFullYear();
	}


	/**
	 * 12-hour format of an hour with leading zeros
	 * @param date
	 */
	static h(date?: DateLike);
	static h(date = new Dates) {
		return zerofill_2(Dates.g(date));
	}

	/**
	 * 24-hour format of an hour with leading zeros
	 * @param date
	 */
	static H(date?: DateLike);
	static H(date = new Dates) {
		return zerofill_2(Dates.by(date).getHours());
	}


	/**
	 * Minutes with leading zeros
	 * @param date
	 */
	static i(date?: DateLike);
	static i(date = new Dates) {
		return zerofill_2(Dates.by(date).getMinutes());
	}

	/**
	 * Seconds with leading zeros
	 * @param date
	 */
	static s(date?: DateLike);
	static s(date = new Dates) {
		return zerofill_2(Dates.by(date).getSeconds());
	}


	/**
	 * Microseconds
	 * @example 654
	 * @param date
	 */
	static v(date?: DateLike);
	static v(date = new Dates) {
		// todo check
		return Dates.by(date).getMilliseconds();
	}

	/**
	 * Microseconds
	 * @example 654321
	 * @param date
	 */
	static u(date?: DateLike);
	static u(date = new Dates) {
		// todo check
		return Dates.by(date).getMilliseconds();
	}

	/**
	 * Day of the month, 2 digits with leading zeros
	 * @param date
	 */
	static d(date?: DateLike);
	static d(date = new Dates) {
		return zerofill_2(Dates.by(date).getDate());
	}

	/**
	 * Day of the month without leading zeros
	 * @param date
	 */
	static j(date: DateLike);
	static j(date = new Dates) {
		return Dates.by(date).getDate();
	}

	/**
	 * ISO-8601 numeric representation of the day of the week
	 * @param date
	 */
	static N(date?: DateLike);
	static N(date = new Dates) {
		return Dates.by(date).getDay() || 7;
	}


	//////////////////////////////
	// prototypes

	/**
	 * get yesterday dates
	 */
	yesterday() {
		return Dates.by(
			this.firstTime().getTime() - DAY_TIME
		);
	}

	/**
	 * get tomorrow dates
	 */
	tomorrow() {
		return Dates.by(
			this.firstTime().getTime() + DAY_TIME
		);
	}

	/**
	 * get dates as first time of this date
	 * @description
	 *   Y-m-d 00:00:00
	 */
	firstTime() {
		return this.formatted('Y-m-dT00:00:00');
	}

	/**
	 * get dates at the given time as on time.
	 */
	onTime() {
		return this.formatted('Y-m-dTH:00:00');
	}


	/**
	 * get dates as last time of this date
	 * @description
	 *   Y-m-d 23:59:59
	 */
	lastTime() {
		return this.formatted('Y-m-dT23:59:59');
	}

	/**
	 * get dates as first date time of given month
	 * @description
	 *   Y-m-d 00:00:00
	 */
	firstDate() {
		return this.formatted('Y-m-01T00:00:00');
	}

	/**
	 * get dates as last date time of given month
	 * @description
	 *   Y-m-L 23:59:59
	 */
	lastDate() {
		return this.formatted('Y-m-tT23:59:59');
	}

	/**
	 * @alias Dates.L
	 */
	isLeapYear() {
		return this.L();
	}

	/**
	 * get last dates of given month
	 */
	dates() {
		const m = this.getMonth();
		return LAST_DATE[m] + (m === 1 ? this.L() : 0);
	}

	/**
	 * @deprecated
	 */
	timestamp() {
		return this.format('Y-m-d H:i:s');
	}

	/**
	 * @deprecated
	 */
	modify(format: string) {
		const time = new Dates(this.getTime());

		let seconds = 0;

		const matched = format.match(_FIXERS);

		if (!matched) {
			return time;
		}

		matched.forEach(command => {
			const split = command.match(_FIXER);
			const value = Number(split[1] === '-' ? -(split[2] || 1) : split[2] || 1);

			if (!value) {
				return;
			}

			const unit = split[3];

			switch (unit) {
				case 'y':
				case 'ye':
					time.setFullYear(time.getFullYear() + value);
					break;
				case 'm':
				case 'mo':
					const months = time.getMonth() + value;
					if (months < 12) {
						time.setMonth(months);
					} else {
						time.setFullYear(time.getFullYear() + Math.ceil(months / 12)
						);

						time.setMonth(months % 12);
					}
					break;
				case 'd':
				case 'da':
					seconds += value * 86400;
					break;

				case 'h':
				case 'ho':
					seconds += value * 3600;
					break;
				case 'i':
				case 'mi':
					seconds += value * 60;
					break;
				case 's':
				case 'se':
					seconds += value;
					break;
			}
		});

		return new Dates(time.getTime() + (seconds * 1000));
	}

	/**
	 * format a local time/date
	 * @see https://www.php.net/manual/en/function.date.php
	 * @param format
	 */
	format(format: string);
	format(format) {
		return Dates.format(format, this);
	}

	/**
	 * get new dates from format
	 * @param format
	 */
	formatted(format: string);
	formatted(format) {
		return Dates.by(this.format(format));
	}

	/**
	 * Day of the month, 2 digits with leading zeros
	 */
	d() {
		return zerofill_2(this.getDate());
	}

	/*
	static D(date: Target){
	  return date.getDate();
	}
	D(){
	  return date.getDate();
	}
	*/


	/**
	 * Day of the month without leading zeros
	 */
	j() {
		return this.getDate();
	}

	/*
	static l(date:Target){

	}
	l(){

	}
	*/


	/**
	 * ISO-8601 numeric representation of the day of the week
	 */
	N() {
		return this.getDay() || 7;
	}


	/**
	 * English ordinal suffix for the day of the month, 2 characters
	 */
	S() {
		return Dates.S(this);
	}


	/**
	 * Numeric representation of the day of the week
	 */
	w() {
		return this.getDay();
	}

	/**
	 * ISO-8601 week number of year, weeks starting on Monday
	 * @param date
	 */
	/*
	static W(date: Target) {
  
	}
  
	W() {
	  return Dates.W(this);
	}
	*/

	/**
	 * A full textual representation of a month, such as January or March
	 * @param date
	 */

	/*
	static F(date: Target){
  
	}
	F(){
	  return Dates.F(this);
	}
	 */


	/**
	 * Numeric representation of a month, with leading zeros
	 */
	m() {
		return zerofill_2(this.getMonth());
	}

	/**
	 * A short textual representation of a month, three letters
	 * @param date
	 */

	/*
	static M(date: Target){
  
	}
  
	M(){
  
	}
	 */


	/**
	 * Numeric representation of a month, without leading zeros
	 */
	n() {
		return this.getMonth() + 1;
	}


	/**
	 * Number of days in the given month
	 */
	t() {
		return Dates.t(this);
	}


	/**
	 * The day of the year (starting from 0)
	 */
	z() {
		return Dates.z(this);
	}

	//////////////////////////////
	// Year
	//////////////////////////////


	/**
	 * Whether it's a leap year
	 */
	L() {
		return Dates.L(this);
	}


	/**
	 * ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.
	 */
	o() {
		return this.getFullYear();
	}


	/**
	 * A full numeric representation of a year, 4 digits
	 */
	Y() {
		return this.getFullYear();
	}


	/**
	 * A two digit representation of a year
	 */
	y() {
		return String(this.getFullYear()).slice(2);
	}

	//////////////////////////////
	// Time
	//////////////////////////////

	/**
	 * Lowercase Ante meridiem and Post meridiem
	 */
	A() {
		return Dates.A(this);
	}

	/**
	 * B, what is it internet time ?
	 */


	/**
	 * 12-hour format of an hour without leading zeros
	 */
	g() {
		return Dates.g(this);
	}


	/**
	 * 24-hour format of an hour without leading zeros
	 */
	G() {
		return Dates.G(this);
	}

	/**
	 * Uppercase Ante meridiem and Post meridiem
	 */
	a() {
		return Dates.a(this);
	}

	/**
	 * 12-hour format of an hour with leading zeros
	 */
	h() {
		return Dates.h(this);
	}


	/**
	 * 24-hour format of an hour with leading zeros
	 */
	H() {
		return Dates.H(this);
	}

	/**
	 * Minutes with leading zeros
	 */
	i() {
		return Dates.i(this);
	}


	/**
	 * Seconds with leading zeros
	 */
	s() {
		return Dates.s(this);
	}


	/**
	 * Microseconds
	 * @example 654321
	 */
	u() {
		return Dates.u(this);
	}


	v() {
		return Dates.v(this);
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
	// todo: c
	// todo: r
	// todo: U
}

function zerofill_2(value: number) {
	return value < 10 ?
		'0' + value :
		value;
}
