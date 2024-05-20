import {DateParts} from './date-parts';

/**
 * Parse each parts of the date as number.
 */
export class DateDigitUnits {
	/**
	 * Year
	 */
	y!: number;
	/**
	 * Month
	 */
	m!: number;
	/**
	 * Date
	 */
	d!: number;
	/**
	 * Hour
	 */
	h!: number;
	/**
	 * Minute
	 */
	i!: number;
	/**
	 * Second
	 */
	s!: number;
	/**
	 * Year to Month
	 */
	ym!: number;
	/**
	 * Year to Date
	 */
	ymd!: number;
	/**
	 * Year to Hour
	 */
	ymdh!: number;
	/**
	 * Year to Minute
	 */
	ymdhi!: number;
	/**
	 * Year to Second
	 */
	ymdhis!: number;

	constructor(date_or_parts?: Date | DateParts) {
		const parts = date_or_parts instanceof DateParts ?
			date_or_parts :
			new DateParts(date_or_parts);

		const {y, m, d, h, i, s} = parts;

		const ym     = y + m;
		const ymd    = ym + d;
		const ymdh   = ymd + h;
		const ymdhi  = ymdh + i;
		const ymdhis = ymdhi + s;

		this.y = +y;
		this.m = +m;
		this.d = +d;
		this.h = +h;
		this.i = +i;
		this.s = +s;

		this.ym     = +ym;
		this.ymd    = +ymd;
		this.ymdh   = +ymdh;
		this.ymdhi  = +ymdhi;
		this.ymdhis = +ymdhis;
	}
}
