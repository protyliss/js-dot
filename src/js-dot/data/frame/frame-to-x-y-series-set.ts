import {getDate} from '@js-dot/core/date';

export interface FrameToXYSeriesSetOption {
	/**
	 * @default 1
	 */
	timeIndex: number;

	/**
	 * Has frame heading on First Index
	 * @default false
	 */
	hasHeader: boolean;

	/**
	 * Transform Column Validation
	 * @description
	 * if hasHeader is true, value will header string
	 * else value will index number
	 * @default () => true;
	 */
	filter: (value: number | string) => boolean;
}

/**
 * @description
 * Before:
 * ```json
 * [
 * 	["date", "foo", "bar"],
 * 	[1, 2, 3]
 * 	[2, 20, 30]
 * ]
 * ```
 *
 * After:
 * ```json
 * {
 *     "x": [1, 2],
 *     "y": [2, 20]
 * },
 * {
 *     "x": [1, 3],
 *     "y": [2, 30]
 * }
 * ```
 * @param frame
 * @param option
 */
export function frameToXYSeriesSet<T extends string, U extends Partial<FrameToXYSeriesSetOption>>(
	frame: [T[], ...any[]],
	option?: U
): U extends { hasHeader: true } ?
	Record<T, { x: Date[], y: any[], sum:number}> :
	Record<number, { x: Date[], y: any[], sum: number}>
/**
 * @description
 * Before:
 * ```json
 * [
 * 	[1, 2, 3]
 * 	[2, 20, 30]
 * ]
 * ```
 *
 * After:
 * ```json
 * [
 * 	{
 * 	    "x": [1, 2],
 * 	    "y": [2, 20]
 * 	},
 * 	{
 * 	    "x": [1, 3],
 * 	    "y": [2, 30]
 * 	}
 * ]
 * ```
 * @param frame
 * @param option
 */
export function frameToXYSeriesSet(
	frame: any[][],
	option?: Partial<FrameToXYSeriesSetOption>
): Record<number, { x: Date[], y: any[] }>;
export function frameToXYSeriesSet(frame, option?: Partial<FrameToXYSeriesSetOption>) {
	const {timeIndex, filter, hasHeader} = {
		timeIndex: 0,
		hasHeader: false,
		filter: () => true,
		...(option || {})
	};

	if(!frame || !frame.length){
		return [];
	}

	const firstRow = frame[0];
	const columns  = [];
	const ids      = [];
	let end        = firstRow.length;
	let current    = -1;
	if (hasHeader) {
		while (++current < end) {
			const header = firstRow[current];
			if (current === timeIndex || !filter(header)) {
				continue;
			}
			columns[columns.length] = current;
			ids[ids.length]         = header;
		}
	} else {
		while (++current < end) {
			if (current === timeIndex || !filter(current)) {
				continue;
			}
			columns[columns.length] = current;
			ids[ids.length]         = current;
		}
	}

	const columnEnd = columns.length;

	end     = frame.length;
	current = hasHeader ? 0 : -1;

	const set = {};
	const x   = [];
	while (++current < end) {
		const row = frame[current];

		x[x.length] = getDate(row[timeIndex]);

		let columnCurrent = -1;
		while (++columnCurrent < columnEnd) {
			const id     = ids[columnCurrent];
			const series = (
				set[id]
				|| (set[id] = {
					y: []
				})
			)
			const {y} = series;

			y[y.length] = row[columns[columnCurrent]];

		}
	}

	current = ids.length;
	while (current-- > 0) {
		set[ids[current]].x = x;
	}

	return set as any;
}
