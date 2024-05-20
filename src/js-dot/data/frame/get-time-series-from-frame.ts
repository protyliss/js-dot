import {DataFrame} from '../interfaces/column-map-series';

export interface TimeSeriesFromFrameOption {
	/**
	 * @default true
	 */
	hasHeader: boolean;

	/**
	 * Get Multiple Series with Loop Once
	 * @default undefined
	 */
	multiple: boolean;

	/**
	 * TimeIndex
	 * @default 0
	 */
	timeIndex: number;

	/**
	 * auto calculation with `timeIndex + 1`
	 */
	startIndex: number;

	/**
	 * auto calculation with `frame[0].length - 1`
	 */
	endIndex: number;

	/**
	 * @default 'times'
	 */
	timesProperty: string

	/**
	 * @default 'values'
	 */
	valuesProperty: string;

	/**
	 * @default {}
	 */
	properties: object
}

export function getTimeSeriesFromFrame(frame: DataFrame, option: Partial<TimeSeriesFromFrameOption>) {
	option = Object.assign({
			hasHeader: true,
			timeIndex: 0,
			startIndex: 1,
			timesProperty: 'times',
			valuesProperty: 'values',
			extends: {}
		},
		option || {}
	);

	const {timeIndex, startIndex, timesProperty, valuesProperty, properties} = option;

	let end     = frame.length;
	let current = option.hasHeader ? 0 : -1;

	const times = [];

	if (option.multiple) {
		let {endIndex} = option;

		if (!endIndex) {
			endIndex = frame[current].length - 1;
		}

		const set = [];

		while (++current < end) {
			const row = frame[current];

			times[times.length] = row[timeIndex];

			let column = startIndex;
			do {
				(set[column] || (set[column] = [])).push(row[column]);
			} while (++column <= endIndex);
		}

		const result = [];
		end          = set.length;
		current      = startIndex - 1;
		while (++current < end) {
			result[result.length] = {
				[timesProperty]: times,
				[valuesProperty]: set[current],
				...properties
			}
		}

		return result;

	} else {
		const values = [];

		while (++current < end) {
			const row             = frame[current];
			times[times.length]   = row[timeIndex];
			values[values.length] = row[startIndex];
		}

		return {
			[timesProperty]: times,
			[valuesProperty]: values
		}
	}
}
