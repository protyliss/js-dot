/**
 * Offset for filter and display option to change-logs
 */
export interface ChangeLogOffset {
	collapse: boolean,
	level: 'error' | 'warn' | 'log'
}

/**
 * Offset Map by number of dates as property name
 */
export interface ChangeLogOffsets {
	[K: number]: ChangeLogOffset;
}

/**
 * Change-log Map by date with function for import content
 *
 * @example
 * """js
 * {
 *     'yyyy-mm-dd': () => import('./yyyy-mm-dd')
 * }
 * """
 */
export interface PreparedChangeLogs {
	[K: `${number}-${number}-${number}`]: () => Promise<{ default: string }>;
}

/**
 * Filtered Change-log from changeLog().logs
 */
export interface ChangeLog {
	/**
	 * Name of console functions by offset collapse
	 */
	group: 'group' | 'groupCollapsed';
	/**
	 * Name of console functions by offset date as property name
	 */
	log: 'error' | 'warn' | 'log';
	/**
	 * Date of change log
	 */
	date: Date;
	/**
	 * Locale Date string of change log
	 */
	dateString: string;
	/**
	 * content of change log
	 */
	content: string;
}


/**
 * Filtered Change-logs from changeLog()
 */
export interface ChangeLogs {
	/**
	 * Count of filtered Change-logs
	 */
	count: number;
	/**
	 * 's' for plural expression
	 */
	s: 's' | '';
	/**
	 * Change-log array
	 */
	logs: ChangeLog[];
}

/**
 * Get filtered change logs by dates
 *
 * @example
 * ```js
 * changeLog(
 * 	{
 * 		'yyyy-mm-dd': () => import('./foo');
 * 		'yyyy-mm-dd': () => import('./bar');
 * 	},
 * 	{
 * 	    'd' : {collapse: false, level: 'log'}
 * 	}
 * )
 * .then(({logs}) => {
 *    logs.forEach(({date, content}) => {
 *    	console.log(date, content);
 *    });
 * });
 * ```
 * @param logs
 * @param offsets
 */
export function changeLog(
	logs: PreparedChangeLogs,
	offsets: ChangeLogOffsets = {
		7: {collapse: false, level: 'warn'},
		14: {collapse: false, level: 'log'},
		21: {collapse: true, level: 'log'}
	}
): Promise<ChangeLogs> {
	const now         = Date.now();
	const offsetTimes = [];
	for (let days in offsets) {
		if (!offsets.hasOwnProperty(days)) {
			continue;
		}
		offsetTimes[offsetTimes.length] = [days, now - (86400000 * +days)];
	}

	const loggables: Array<Promise<ChangeLog>> = [];
	const {length: offsetTimesEnd}             = offsetTimes;

	for (let dateString in logs) {
		if (!logs.hasOwnProperty(dateString)) {
			continue;
		}

		const date  = new Date(dateString);
		const time  = date.getTime();
		let current = -1;

		let offset;
		while (++current < offsetTimesEnd) {
			const [days, offsetTime] = offsetTimes[current];

			if (time > offsetTime) {
				offset = offsets[days];
				break;
			}
		}

		if (!offset) {
			break;
		}

		loggables[loggables.length] = logs[dateString]().then(({default: content}) => {
			return {
				date,
				dateString: date.toLocaleDateString(),
				content: reformat(content),
				group: offset.collapse ? 'groupCollapsed' : 'group',
				log: offset.level
			}
		})
	}

	return new Promise(resolve => {
		loggables.length && Promise.all(loggables)
			.then(logs => {
				resolve({
					count: logs.length,
					s: logs.length > 1 ? 's' : '',
					logs: logs
				});
			});
	})
}

const _DATE_HEADING = /^#\s*\d\d\d\d\-\d\d?\-\d\d?/;
function reformat(logString: string) {
	const lines = logString.trim().split(/[\n\r]+/);
	if (_DATE_HEADING.test(lines[0].trim())) {
		lines.shift();
	}

	return lines.join('\n');
}