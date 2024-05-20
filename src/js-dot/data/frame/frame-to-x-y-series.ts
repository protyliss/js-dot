import {getDate} from '@js-dot/core/date';

export interface FrameToTimeSeriesOption {
	/**
	 * @default 0
	 */
	timeIndex: number;
	/**
	 * @default 1
	 */
	columnIndex: number;

	/**
	 * @default true
	 */
	hasHeader: boolean;

	/**
	 * @default {}
	 */
	properties: object;
}

export function frameToXYSeries(frame: any[][], option?: Partial<FrameToTimeSeriesOption>) {
	const {timeIndex, columnIndex, hasHeader, properties} = {
		timeIndex: 0,
		columnIndex: 1,
		hasHeader: false,
		properties: {},
		...(option || {})
	};

	option = {
		timeIndex: 0,
		columnIndex: 1,
		hasHeader: false,
		properties: {},
		...(option || {})
	}

	const end   = frame.length;
	let current = hasHeader ? 0 : -1;
	const x     = [];
	const y     = [];
	while (++current < end) {
		const row   = frame[current];
		x[x.length] = getDate(row[timeIndex]);
		y[y.length] = row[columnIndex];
	}

	return {
		x,
		y,
		...properties
	};
}
