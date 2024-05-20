/**
 * Set `term` timer
 * : setTimeout with over 24.8days
 *
 * @example Run after 365 days
 * ```js
 * setTerm(() => {}, 365 * 86400 * 1000);
 * ```
 *
 * @see setTimeout
 * @param handler
 * @param timeout
 * @param args
 */
export function setTerm(handler: TimerHandler, timeout: number, ...args: any[]): number {
	const {floor: FLOOR} = Math;
	const MAX_TIMEOUT = 2 ** 31 - 1;
	// @ts-ignore: TS2630
	return (setTerm = function setTermLazier(handler_: TimerHandler, timeout_: number, ...args_: any[]) {
		if (timeout_ < MAX_TIMEOUT) {
			return setTimeout(handler_, timeout_, ...args_);
		}

		let ticks   = FLOOR(timeout_ / MAX_TIMEOUT);
		const timer = setInterval(() => {
				if (!--ticks) {
					setTimeout(handler_, timeout_ % MAX_TIMEOUT, ...args_);
					clearInterval(timer);
				}
			},
			MAX_TIMEOUT
		);
		return timer;
	}).apply(this, arguments);
}

/**
 * Remove `term` timer
 * : clearTimeout with over 24.8days
 *
 * @description
 * Does not matter using with clearTimeout instead
 *
 * @example
 * ```js
 * clearTerm(setTerm(()=>{}));
 * ```
 *
 * @alias clearTimeout
 * @param id
 */
export function clearTerm(id: number | undefined) {
	clearTimeout(id);
}