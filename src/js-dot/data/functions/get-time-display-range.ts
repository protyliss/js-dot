import {DataFrame} from '../interfaces/column-map-series';
import {DateParts} from '@js-dot/core/date';

export type TimeDisplayRange =
    | 'year'
    | 'year-month'
    | 'year-day'
    | 'year-hour'
    | 'year-minute'
    | 'origin'

const TESTS: Array<[TimeDisplayRange, string]> = [
    ['year', 'y'],
    ['year-month', 'm'],
    ['year-day', 'd'],
    ['year-hour', 'h'],
    ['year-minute', 'i'],
    ['origin', 's']
];

/**
 * Get Time Display Range.
 * for the Does not display that the same value per unit
 * @param frame
 */
export function getTimeDisplayRange(frame: DataFrame): TimeDisplayRange {
    if (frame.length < 2) {
        return;
    }

    const first = new DateParts(new Date(frame[0][0] as any));
    const last = frame[frame.length - 1][0] as any;
    const compares = [new DateParts(new Date(last))];
    if (frame.length > 2) {
        const mid = frame[Math.floor(frame.length / 2)][0] as any;
        compares[compares.length] = new DateParts(new Date(mid));
    }

    let current = TESTS.length;
    while (current-- > 0) {
        const [condition, property] = TESTS[current];

        if (!compares.every(compare => first[property] == compare[property])) {
            return condition;
        }
    }

    return 'origin';
}
