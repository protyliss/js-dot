import {zerofill} from '@js-dot/core';
import {DateParts} from './date-parts';

export function toDateDigit(date: string | number | Date = new Date): string {
    if (!(date instanceof Date)) {
        date = new Date(date)
    }

    const {y, m, d, h, i, s, u, t} = new DateParts(date);
    const su = (+s) + (+u);
    const isu = (+i) + (+su);

    const time = y + m + d
        + (
            (+h) + isu ?
                h
                + (isu ?
                        i
                        + (su ?
                                s + (+u) :
                                ''
                        ) :
                        ''
                ) :
                ''
        );

    return t ?
        t < 0 ?
            '-' + time + '.' + zerofill(-t) :
            time + '.' + zerofill(t) :
        time;

}
