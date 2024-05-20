/**
 * ClearInterval, If Declared Timer
 * @param timer
 */
export function checkInterval(timer: void | number);
/**
 * ClearInterval, If Declared Timer and Return setInterval as new
 * @param timer
 * @param callback
 * @param delay
 * @param args
 */
export function checkInterval(timer: void | number, callback: Function, delay?: number, ...args: any[]);
export function checkInterval(timer, callback?, delay = 0, ...args: any[]) {
	clearInterval(timer);

	if (!callback) {
		return null;
	}

	return setInterval(callback, delay, ...args);
}
