import {Period} from './period';
import {DateUnitDates} from './date-unit-dates';
import {dateFormatted} from './date-formatted';

export const TIME_UNIT = {
    year: 'year',
    month: 'month',
    day: 'day',
    hour: 'hour',
    minute: 'minute',
    second: 'second'
} as const;

export type TimeUnit = typeof TIME_UNIT[keyof typeof TIME_UNIT];

export interface PeriodUnitCondition<Y, M, D, H, I, S> {
    /**
     * Target of Year Unit
     */
    year: Y;
    /**
     * Target of Day Unit
     */
    /**
     * Target of Month Unit
     */
    month: M;
    /**
     * Target of Month Unit
     */
    day: D;
    /**
     * Target of Hour Unit
     */
    hour: H;
    /**
     * Target of Minute Unit
     */
    minute: I;
    /**
     * Target of Second Unit as Default
     */
    second: S;

    yearDays: number;
    monthDays: number;
    yearFrom: number;
    monthFrom: number;
    dateFrom: number;
    hourFrom: number;
    minuteFrom: number;
}

/**
 * Operating Time Unit with the Period
 */
export class PeriodUnits<Y = never, M = never, D = never, H = never, I = never, S = never> {

    protected _yearAmount: number;
    protected _monthAmount: number;
    protected _condition: PeriodUnitCondition<Y, M, D, H, I, S>;

    _test!: string;

    constructor(condition: Partial<PeriodUnitCondition<Y, M, D, H, I, S>>) {
        condition = {
            yearDays: 365,
            monthDays: 30,
            yearFrom: 3,
            monthFrom: 6,
            dateFrom: 7,
            hourFrom: 86399,
            minuteFrom: 3599,
            ...condition
        };

        this._condition = condition as PeriodUnitCondition<Y, M, D, H, I, S>;
        this._yearAmount = condition.yearDays * condition.yearFrom;
        this._monthAmount = condition.monthDays * condition.monthFrom;

        this._test = JSON.stringify(this._condition);
    }

    /**
     * Get unit automatically selected by period expression
     * @param periodExp
     */
    auto(periodExp: string): PeriodUnit<Y | M | D | H | I | S>;

    /**
     * Get unit automatically selected by period
     * @param period
     */
    auto(period: Period): PeriodUnit<Y | M | D | H | I | S>;


    auto(period: string | Period) {
        period = Period.from(period);

        const {days} = period;
        const begin = new DateUnitDates(period.begin);
        const end = new DateUnitDates(period.end);

        const {_condition} = this;
        const isYear = days >= this._yearAmount;
        if (_condition.year) {
            if (isYear) {
                return this.year(period);
            }
        }

        const isMonth = days >= this._monthAmount;
        if (_condition.month) {
            if (isYear || isMonth) {
                return this.month(period);
            }
        }

        const isDay = days >= _condition.dateFrom;
        if (_condition.day) {
            if (isYear || isMonth || isDay) {
                return this.day(period);
            }
        }

        const {durationSeconds} = period;
        const isHour = durationSeconds >= _condition.hourFrom;
        if (_condition.hour) {
            if (isYear || isMonth || isDay || isHour) {
                return this.hour(period);
            }
        }

        const isMinute = durationSeconds >= _condition.minuteFrom
            || (
                begin.ymdh === end.ymdh
                && +begin.parts.i === 0
                && +end.parts.i - +begin.parts.i > 10
            );

        if (_condition.minute) {
            if (isYear || isMonth || isDay || isHour || isMinute) {
                return this.minute(period);
            }
        }

        return this.second(period);
    }

    /**
     * Get Unit by unit string
     * @param period
     * @param unit
     */
    get(period: string | Period, unit: TimeUnit) {
        if (typeof this[unit] !== 'function') {
            throw RangeError(`Invalid Time Unit: ${unit}`);
        }
        return this[unit](period);
    }

    /**
     * Get Year's unit
     * @param period
     */
    year(period: string | Period): PeriodUnit<Y | M | D | H | I | S> {
        const target = this._condition.year;

        if (!target) {
            return this.month(period);
        }

        period = Period.from(period);

        return new PeriodUnit(
            TIME_UNIT.year,
            target,
            dateFormatted('Y-01-01T00:00:00.000', period.begin),
            dateFormatted('Y-12-30T23:59:59.999', period.end)
        );
    }

    /**
     * Get Month's unit
     * @param period
     */
    month(period: string | Period): PeriodUnit<M | D | H | I | S> {
        const target = this._condition.month;

        if (!target) {
            return this.day(period);
        }

        period = Period.from(period);

        return new PeriodUnit(
            TIME_UNIT.month,
            target,
            dateFormatted('Y-m-01T00:00:00.000', period.begin),
            dateFormatted('Y-m-30T23:59:59.999', period.end)
        );
    }

    /**
     * Get Day's unit
     * @param period
     */
    day(period: string | Period): PeriodUnit<D | H | I | S> {
        const target = this._condition.day;

        if (!target) {
            return this.hour(period);
        }

        period = Period.from(period);

        return new PeriodUnit(
            TIME_UNIT.day,
            target,
            dateFormatted('Y-m-dT00:00:00.000', period.begin),
            dateFormatted('Y-m-dT23:59:59.999', period.end)
        );
    }

    /**
     * Get Hour's unit
     * @param period
     */
    hour(period: string | Period): PeriodUnit<H | I | S> {
        const target = this._condition.hour;

        if (!target) {
            return this.minute(period);
        }

        period = Period.from(period);

        return new PeriodUnit(
            TIME_UNIT.hour,
            target,
            dateFormatted('Y-m-dTH:00:00.000', period.begin),
            dateFormatted('Y-m-dTH:59:59.999', period.end)
        );
    }

    /**
     * Get Minute's unit
     * @param period
     */
    minute(period: string | Period): PeriodUnit<I | S> {
        const target = this._condition.minute;

        if (!target) {
            return this.second(period);
        }

        period = Period.from(period);

        return new PeriodUnit(
            TIME_UNIT.minute,
            target,
            dateFormatted('Y-m-dTH:i:00.000', period.begin),
            dateFormatted('Y-m-dTH:i:59.999', period.end)
        );
    }

    /**
     * Get Second's unit
     * @param period
     */
    second(period: string | Period): PeriodUnit<S> {
        period = Period.from(period);

        return new PeriodUnit(
            TIME_UNIT.second,
            this._condition.second,
            period.begin,
            period.end
        );
    }
}

export class PeriodUnit<T> {
    constructor(
        public unit: TimeUnit,
        public target: T,
        public begin: Date,
        public end: Date
    ) {
    }
}
