import {getDate} from '@js-dot/core/date';
import {DataFrame, TimeSeriesArrayMap} from '../interfaces/column-map-series';
import {frameInterpolate} from './frame-interpolate';

export interface TimeSeriesArrayMapToFrameOption<T extends object = object> {
    /**
     * Date-able Array Item Index
     * @default 0
     */
    timestampIndex: number;
    /**
     * @default 1
     */
    valueIndex: number;

    /**
     * @default "second"
     */
    unit: string;

    /**
     * @default "Date"
     */
    dateHeader: string;

    headers: Array<keyof T>;
}

const DATE_ENDS = {
    year: 4,
    month: 7,
    day: 10,
    hour: 13,
    minute: 16,
    second: 19
};

const MERGE_AFTER = '0000-01-01T00:00:00.000Z'

/**
 * Get Dataframe from Time Series Array in Object
 * @example
 * before:
 * ```js
 * fromTimeSeriesArrayMap({
 *   'a': [
 *       ['2022-11-30T00', 1],
 *       ['2022-11-30T01', 2],
 *       ['2022-11-30T02', 3]
 *   ],
 *   'b': [
 *      ['2022-11-30T00', 10],
 *      ['2022-11-30T01', 20],
 *      ['2022-11-30T02', 30]
 *   ]
 * });
 * ```
 *
 * after:
 * ```js
 * [
 *  ['Date', 'a', 'b'],
 *  ['2022-11-30T00', 1, 10],
 *  ['2022-11-30T01', 2, 20],
 *  ['2022-11-30T02', 3, 30],
 * ]
 * ```
 * @param map
 * @param option
 */
export function fromTimeSeriesArrayMap<T extends TimeSeriesArrayMap>(
    map: T,
    option?: Partial<TimeSeriesArrayMapToFrameOption<T>>
): DataFrame {
    option = Object.assign(
        {
            timestampIndex: 0,
            valueIndex: 1,
            dateHeader: 'Date',
            unit: 'second'
        },
        option || {}
    )

    const {timestampIndex, valueIndex, dateHeader} = option;
    if (timestampIndex === valueIndex) {
        throw new RangeError('Time and Value Indexes are same.');
    }

    const headers = (option.headers || Object.keys(map)) as string[];
    let rowEnd = headers.length;
    let rowCurrent = -1;

    const frame = [[dateHeader, ...headers]];
    const indexes = {};

    const dateEnd = DATE_ENDS[option.unit];

    // const timezoneOffset = -((new Date).getTimezoneOffset() * 60000);

    while (++rowCurrent < rowEnd) {
        const header = headers[rowCurrent];
        const items = map[header];

        const cellCurrent = rowCurrent + 1;
        const itemEnd = items?.length;
        let itemCurrent = -1;

        while (++itemCurrent < itemEnd) {
            const item = items[itemCurrent];
            const timestamp = item[timestampIndex] as any;
            const date = getDate(timestamp);
            const mergeKey = date.toISOString().substring(0, dateEnd);
            const mergeDate = mergeKey + MERGE_AFTER.substring(dateEnd);

            let index = indexes[mergeKey];

            if (index === undefined) {
                index = frame.length;
                frame[index] = [mergeDate];
                indexes[mergeKey] = index;
            }

            frame[index][cellCurrent] = item[valueIndex];
        }
    }

    return frameInterpolate(frame, 1);
}
