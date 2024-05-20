import {DateParts} from './date-parts';

/**
 * Parse each parts of the date as string;
 */
export class DateStringUnits {
    y!: string;
    m!: string;
    d!: string;
    h!: string;
    i!: string;

    ym!: string;
    ymd!: string;
    ymdh!: string;
    ymdhi!: string;

    constructor(date_or_parts: Date | DateParts) {
        const parts = date_or_parts instanceof DateParts ?
            date_or_parts :
            new DateParts(date_or_parts);

        const {y, m, d, h, i} = parts;

        const ym = `${y}-${m}`;
        const ymd = `${ym}-${d}`;
        const ymdh = `${ymd} ${h}`;
        const ymdhi = `${ymdh}:${i}`;

        this.y = y;
        this.m = m;
        this.d = d;
        this.h = h;
        this.i = i;

        this.ym = ym;
        this.ymd = ymd;
        this.ymdh = ymdh;
        this.ymdhi = ymdhi;
    }
}
