import {DateLike} from './dates';
import {getDate} from './get-date';
import {dateModify} from './date-modify';
import {dateFormatted} from './date-formatted';
import {toDateDigit} from './to-date-digit';
import {getLastDate} from './get-last-date';

export interface PeriodSegments {
	past?: Period;
	future?: Period;
}

export type PeriodAlias =
	| 'yesterday'
	| 'today'
	| 'tomorrow'
	| 'week'
	| 'month'
	| 'year'
	| 'now-month'
	| 'now-year'
// | 'now-of-year'

const PERIOD_GLUE = '~';

/**
 * pair of Dates as meaning of period
 */
export class Period {
	#duration!: number;
	#durationSeconds!: number;
	#days!: number;

	begin!: Date;
	end!: Date;

	/**
	 * Get Period Instance even Event target is already Period Instance.
	 * @param periodExp
	 */
	static from(periodExp: string | PeriodAlias | Period): Period;
	static from(begin: DateLike, end?: DateLike): Period;
	static from(begin_or_periodExp, end?) {
		if (begin_or_periodExp instanceof Period) {
			return begin_or_periodExp;
		}

		if (end instanceof Period) {
			throw new RangeError('the `end` argument cannot be Period Instance');
		}

		return arguments.length === 1 ?
			new Period(begin_or_periodExp) :
			new Period(begin_or_periodExp, end);
	}

	static timestamp(begin: Period | DateLike, end?: DateLike);
	static timestamp(begin, end?) {
		return Period.from(begin, end).timestamp();
	}

	get duration() {
		return this.#duration || (this.#duration = this.end.getTime() - this.begin.getTime());
	}

	get durationSeconds() {
		return this.#durationSeconds || (this.#durationSeconds = this.duration / 1000);
	}

	get days() {
		return this.#days || (this.#days = this.durationSeconds / 86400);
	}

	constructor(periodExp: string | PeriodAlias | Period);
	constructor(begin: DateLike, end?: DateLike);
	constructor(begin_or_periodExp, end?) {
		let begin = begin_or_periodExp;

		switch (typeof begin) {
			case 'string':
				switch (begin) {
					case 'yesterday':
						const yesterday = dateModify('-1d');
						begin           = dateFormatted('Y-m-d 00:00:00.000', yesterday);
						end             = dateFormatted('Y-m-d 23:59:59.999', yesterday);
						break;
					case 'today':
						begin = dateFormatted('Y-m-d 00:00:00.000')
						end   = dateFormatted('Y-m-d 23:59:59.999')
						break;
					case 'tomorrow':
						const tomorrow = dateModify('+1d');
						begin          = dateFormatted('Y-m-d 00:00:00.000', tomorrow);
						end            = dateFormatted('Y-m-d 23:59:59.999', tomorrow);
						break;
					case 'week':
						begin = dateFormatted('Y-m-d 00:00:00.000', dateModify('-7d'))
						end   = dateFormatted('Y-m-d 23:59:59.999')
						break;
					case 'month':
						begin = dateFormatted('Y-m-1 00:00:00.000');
						end   = dateFormatted(`Y-m-${getLastDate(begin)} 23:59:59.999`);
						break;
					case 'now-month':
						begin = dateFormatted('Y-m-1 00:00:00.000');
						end   = new Date;
						break;
					default:
						if (arguments.length === 1) {
							if (!begin.includes('~')) {
								throw RangeError('Period Required `~` Separator in Period string expression');
							}
							const [beginString, endString] = (begin as string).split(PERIOD_GLUE);
							begin                          = beginString ? getDate(beginString) : new Date;
							end                            = endString ? getDate(endString, true) : new Date;
						} else {
							if (!begin && !end) {
								throw RangeError('Period Required `begin` date or `end` date in Separated Date.');
							}
							begin = begin ? getDate(begin) : null;
							end   = end ? getDate(end) : null;
						}
				}
				break;
			case 'number':
				begin = new Date(begin);
				break;
			default:
				if (begin instanceof Period) {
					this.begin = begin.begin;
					this.end   = begin.end;
					return;
				}

				// end = new Date;
		}

		this.begin = begin;
		this.end   = end;
	}

	/**
	 * get period string
	 */
	timestamp() {
		const {begin, end} = this;
		return (begin ? this.begin.toISOString() : '') + '~' + (end ? this.end.toISOString() : '')
	}

	toDigit() {
		const {begin, end} = this;
		return begin || end ?
			(begin ? toDateDigit(this.begin) : '') + '~' + (end ? toDateDigit(this.end) : '') :
			'';
	}

	toString() {
		return this.toDigit();
	}

	// /**
	//  * split the period to past and future period
	//  * @param separator
	//  */
	// split(separator?: DateLike): PeriodSegments;
	// split(separator = new Date) {
	// 	separator = dateFormatted('Y-m-dTH:00:00', separator)
	//
	// 	const {begin, end} = this;
	// 	if (begin < separator) {
	// 		const past = new Period(begin, separator);
	// 		if (end > separator) {
	// 			return {
	// 				past,
	// 				future: new Period(separator, end)
	// 			};
	// 		}
	// 		return {
	// 			past
	// 		};
	// 	}
	// 	return {
	// 		future: this
	// 	};
	// }

	split(microseconds: number){
		const {begin, end} = this;
		const periods = [];
		let current = begin;
		let next: Date;
		do {
			next = new Date(current.getTime() + microseconds);
			if(next > end){
				next = end;
			}
			periods[periods.length] = new Period(begin, next);
			current = next;
		}while(next < end);

		return periods;
	}
}
