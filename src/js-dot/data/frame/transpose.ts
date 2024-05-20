import {DataFrame} from '../interfaces/column-map-series';

/**
 * Dataframe Transpose
 * @example
 * before:
 * ```js
 * transpose([
 *  [1, 2, 3],
 *  [11, 22, 33],
 *  [111, 222, 333]
 * ]);
 * ```
 *
 * after:
 * ```js
 * [
 *  [1, 11, 111],
 *  [2, 22, 222],
 *  [3, 33, 333]
 * ]
 * ```
 * @param frame
 */
export function transpose(frame: DataFrame): DataFrame {
    const result = [];
    const rowEnd = frame.length;
    let rowCurrent = -1;
    while (++rowCurrent < rowEnd) {
        const row = frame[rowCurrent];

        const cellEnd = row.length;
        let cellCurrent = -1;


        while (++cellCurrent < cellEnd) {
            (result[cellCurrent] || (result[cellCurrent] = [])).push(
                row[cellCurrent]
            )
        }
    }

    return result;
}
