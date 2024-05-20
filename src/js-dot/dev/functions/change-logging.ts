import {ChangeLogs, h1, h2} from '@js-dot/dev';

/**
 * Default logging for change logs
 *
 * @example Simple
 * ```js
 * changeLog({}).then(changeLogging('foo'));
 * ```
 *
 * @example Set logger for logging location.
 * ```js
 * changeLog({}).then(changeLogging('foo', (method, args) => console[method](...args)));
 * ```
 *
 * @param scope Prefix of first group label
 * @param logger Simple logger to applies console methods.
 */
export function changeLogging(
	scope: string,
	logger: (
		method: 'group' | 'groupCollapsed' | 'groupEnd' | 'log' | 'info' | 'debug' | 'warn' | 'error' | 'count' | 'time' | 'timeEnd',
		...args: any[]
	) => void = (method, ...args) => console[method](...args)
) {
	return function changeLoggingScope({count, s, logs}: ChangeLogs) {
		logger('group', h1(`[${scope}] ${count} latest change${s}.`));

		const end   = logs.length;
		let current = -1;
		while (++current < end) {
			const {group, log, dateString, content} = logs[current];
			logger(group, h2(dateString));
			logger(log, content);
			logger('groupEnd', );
		}

		logger('groupEnd');
	}
}

