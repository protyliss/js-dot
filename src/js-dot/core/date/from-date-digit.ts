import {_DIGIT_TIMESTAMP} from './_digit-timestamp';
import {getLastDate} from '@js-dot/core/date';

/**
 * Get Date from Parts of Date Digit
 * @param digitParts
 * @param forEnd
 */
export function fromDateDigit(digitParts: string[], forEnd?: boolean);
/**
 * Get Date from Date Digit Expression
 * @param dateDigitExp
 * @param forEnd
 */
export function fromDateDigit(dateDigitExp: number | string, forEnd?: boolean);
export function fromDateDigit(digitExp_or_parts: number | string | string[], forEnd?: boolean
): Date {
    const matched = Array.isArray(digitExp_or_parts) ?
        digitExp_or_parts :
        ('' + digitExp_or_parts).match(_DIGIT_TIMESTAMP);

    if (!matched) {
        throw RangeError(`Invalid Digit Timestamp Expression: ${digitExp_or_parts}`);
    }

    const [_, type, y, m, d, h, i, s, u, z] = matched;

    let date: Date;
    if (forEnd) {
        const fixedM = m ? +m - 1 : 11;
        date = new Date(
            +y,
            fixedM,
            d ? +d : getLastDate(new Date(+y, fixedM)),
            h ? +h : 23,
            i ? +i : 59,
            s ? +s : 59,
            u ? +(u.padEnd(3, '0')) : 999
        )
    } else {
        date = new Date(
            +y,
            +m - 1 || 0,
            +d || 1,
            +h || 0,
            +i || 0,
            +s || 0,
            u ? +(u.padEnd(3, '0')) : 0
        );
    }

    // to expression timezone
    if (z) {
        // to UTC
        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

        const offset = +(('' + z).padEnd(2, '0')) * 3600000;
        return new Date(
            date.getTime() + (
                type === '-' ? offset : -offset
            )
        )
    }

    return date;
}