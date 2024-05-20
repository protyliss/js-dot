/**
 * ClearInterval, If Declared Timer
 * @param timer
 */
export function checkTimeout(timer: void | number);
/**
 * ClearInterval, If Declared Timer and Return setTimeout as new
 * @param timer
 * @param callback
 * @param delay
 * @param args
 */
export function checkTimeout(timer: void | number, callback: Function, delay: number, ...args: any[]);
export function checkTimeout(timer, callback?, delay = 0, ...args: any[]) {
	clearTimeout(timer);

	if (!callback) {
		return null;
	}

	return setTimeout(callback, delay, ...args);
}