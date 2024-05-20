export type ScheduleExpressionSegment = '*' | number | string;
export type ScheduleExpression = `${ScheduleExpressionSegment} ${ScheduleExpressionSegment} ${ScheduleExpressionSegment} ${ScheduleExpressionSegment} ${ScheduleExpressionSegment} ${ScheduleExpressionSegment}`

/**
 * Set Schedule using `cronetab` expression
 *
 * @description
 *
 * expression:
 *
 * ```text
 * ┌─────────── second (optional)
 * │ ┌───────── minute
 * │ │ ┌─────── hour
 * │ │ │ ┌───── date
 * │ │ │ │ ┌─── month
 * │ │ │ │ │ ┌─ day of week
 * * * * * * *
 * ```
 *
 * second:
 * - `N`  : Number as 0 to 59, or *
 * - `M`  : Number as creator than N
 * - `D`  : Number as over 2
 * - `N`  : Single condition
 * - `N-M`: Range condition with hyphen
 * - `N,M`: Multiple condition with comma
 * - `N/M`: Multiple condition with slash
 *
 * minute:
 * Same with second
 *
 * hour:
 * - 0~23
 *
 * date:
 * - 1~31
 *
 * month:
 * - 1~12
 *
 * day of week:
 * - 0~7
 *
 * @example Every 11 seconds
 *
 * ```js
 * setSchedule(console.log, `11 * * * * *`);
 * ```
 *
 * @example Every 30 minutes
 * ```js
 * setSchedule(console.log, `0 30 * * * *`)
 * ```
 *
 * @example Every 9 AM,  9 PM hours
 * ```js
 * setSchedule(console.log, `0 0 9,21 * * *`)
 * ```
 * @param handler
 * @param expression
 */
export function setSchedule(handler: Function, expression: ScheduleExpression) {

	const segments           = expression.split(' ');
	const [s, i, h, d, m, w] = segments;

	let interval: number = 1;

	const secondMatcher = getMatcher(s, 0, 59);
	const minuteMatcher = getMatcher(i, 0, 59);
	const hourMatcher = getMatcher(h, 1, 23);
	const dateMatcher = getMatcher(d, 1, 31);
	const monthMatcher = getMatcher(m, 1, 12);
	const dayMatcher = getMatcher(w, 0, 6);

	console.debug(expression, interval);

	return setInterval(
		(...args) => {
			const now = new Date();
			if (
				secondMatcher(now.getSeconds())
				&& minuteMatcher(now.getMinutes())
				&& hourMatcher(now.getHours())
				&& dateMatcher(now.getDate())
				&& monthMatcher(now.getMonth() + 1)
				&& dayMatcher(now.getDay())
			) {
				setTimeout(handler,0, ...args, now)
			}
		},
		interval * 1000
	);
}

function getMatcher(expression: string, min:number, max: number): (value: number) => boolean {
	if (expression === '*') {
		return wild;
	}

	const cases = expression.split(',');

	const numbers = [];
	const end     = cases.length;

	let current   = -1;
	while (++current < end) {
		const [range, rawDiv] = cases[current].split('/');
		const div = rawDiv ? + rawDiv : 0;
		if (div || range.includes('-')) {
			const [rawFrom, rawTo] = range.split('-');
			let from: number;
			let to:number;
			if(rawFrom === '*'){
				from = min;
				to = max + 1;
			}else{
				to = +rawTo + 1;
			}
			if(div) {
				while (from < to) {
					if(!(from % div)) {
						numbers[numbers.length] = from;
					}
					from++;
				}
			}else{
				while (from < to){
					numbers[numbers.length] = from;
				}
			}
		} else {
			numbers[numbers.length] = range;
		}
	}

	if(numbers.length === 0){
		return value => value === numbers[0];
	}

	console.warn(numbers);
	return (value => numbers.includes(value));
}

function wild() {
	return true;
}

setSchedule(
	console.log,
	'*/10 * * * * *'
)