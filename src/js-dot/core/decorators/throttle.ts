import {downgradeMethodDecorator} from '../functions/downgrade-method-decorator';
import {getTimeout} from './_get-timeout';

const $throttleNonFirst = Symbol('$throttleNonFirst');
const $throttleTimer    = Symbol('$throttleNonFirst');
const $throttleArgs     = Symbol('$throttleArgs');

/**
 * Execution only once per in throttle time.
 * @version stage 3
 * @description
 *
 * | time | call | debounce(1000) | throttle(1000)   |
 * |:----:|:----:|:--------------:|:----------------:|
 * | 0.0s | (1)  | wait 1s        | wait 1s          |
 * | 0.5s | (2)  | wait 1s        |                  |
 * | 1.0s | (3)  | wait 1s        | run (2), wait 1s |
 * | 1.5s |      |                |                  |
 * | 2.0s | (4)  | wait 1s        | run (3), wait 1s |
 * | 2.5s |      |                |                  |
 * | 3.0s |      | run (4)        | run (4)          |
 *
 * @param timeout_or_propertyName throttle timeout or property name that returns throttle timeout.
 * @param ignoreFirst Does not waiting timeout, If this is true
 * @constructor
 */
export function throttle(timeout_or_propertyName: number | string = 240, ignoreFirst: boolean = true) {
	return function throttleMetaDecorator(method: (...args: any[]) => void, context: ClassMethodDecoratorContext) {
		return function throttleDecorator(...args: any[]) {
			let currentTimeout = getTimeout(this, timeout_or_propertyName);

			if (ignoreFirst && !method[$throttleNonFirst]) {
				currentTimeout = 0;
			}

			method[$throttleArgs] = args;

			if (method[$throttleTimer]) {
				return;
			}
			clearTimeout(method[$throttleTimer]);

			method[$throttleTimer] = setTimeout(() => {
				method[$throttleNonFirst] = true;

				method(...method[$throttleArgs]);

				delete method[$throttleTimer];
				delete method[$throttleArgs];
			}, currentTimeout, ...args);
		}
	};


}

/**
 * @version stage 2
 * @alias throttle
 * @see throttle
 */
export const Throttle = downgradeMethodDecorator(throttle);