import {DataFrame} from '@js-dot/data';

/**
 * Fill the empty cell of dataframe rows
 *
 * @example
 * before:
 * ```js
 * frameInterpolate([
 *  ['a', 'b', 'c'],
 *  [1, undefined, undefined],
 *  [undefined, 2, undefined],
 *  [undefined, undefined, 3]
 * ]);
 * ```
 *
 * after:
 * ```js
 * [
 *  [1, 2, 3],
 *  [1, 2, 3],
 *  [1, 2, 3],
 * ]
 * ```
 * @param frame
 * @param start Start Index of Cell
 */
export function frameInterpolate(frame: DataFrame, start = 0) {
    const {length: headerLength} = frame[0];
    const rowEnd = frame.length;
    let rowCurrent = 0;

    start--;

    while (++rowCurrent < rowEnd) {
        const row = frame[rowCurrent];
        let cellCurrent = start;
        cellLoop:
            while (++cellCurrent < headerLength) {
                if (row[cellCurrent] === undefined) {
                    let cursor = rowCurrent;
                    while (--cursor > 0) {
                        let previousValue = frame[cursor][cellCurrent];
                        if (previousValue) {
                            row[cellCurrent] = previousValue;
                            // Does not have to set the emptied values
                            // already set up in before process
                            continue cellLoop;
                        }
                    }
                    cursor = rowCurrent;
                    while (++cursor < rowEnd) {
                        let nextValue = frame[cursor][cellCurrent];
                        if (nextValue) {
                            while (cursor-- > rowCurrent) {
                                frame[cursor][cellCurrent] = nextValue;
                            }
                            continue cellLoop;
                        }
                    }
                }
            }
    }

    return frame;
}