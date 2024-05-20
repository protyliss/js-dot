import {DateParts} from './date-parts';

/**
 * Date Collection by Date Unit
 */
export class DateUnitDates {
    static from(date_or_parts: Date | DateParts) {
        return new this(date_or_parts);
    }

    parts!: DateParts;

    y!: Date;
    ym!: Date;
    ymd!: Date;
    ymdh!: Date;
    ymdhi!: Date;
    ymdhis!: Date;

    constructor(date_or_parts: Date | DateParts, forEnd = false) {
        const parts = date_or_parts instanceof DateParts ? date_or_parts : new DateParts(date_or_parts);
        this.parts = parts;

        const {y, m, d, h, i, s} = parts;
        const fixedM = +m - 1;

        const fillValues =

        this.y = new Date(+y, 0, 1, 0, 0, 0, 0);
        this.ym = new Date(+y, fixedM, 1, 0, 0, 0, 0);
        this.ymd = new Date(+y, fixedM, +d, 0, 0, 0, 0);
        this.ymdh = new Date(+y, fixedM, +d, +h, 0, 0, 0);
        this.ymdhi = new Date(+y, fixedM, +d, +h, +i, 0, 0);
        this.ymdhis = new Date(+y, fixedM, +d, +h, +i, +s, 0);
    }
}