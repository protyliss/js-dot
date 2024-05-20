import {downgradeMethodDecorator} from '../functions/downgrade-method-decorator';
import {getTimeout} from "./_get-timeout";

const $$debounceNonFirst = Symbol('$$debounceNonFirst');
const $$debounceTimer    = Symbol('$$debounceTimer');

/**
 * Execution after timeout when does not call again in timeout ~ stage 2 ~
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
 * @param timeout_or_propertyName debounce timeout or property name that returns debounce timeout.
 * @param ignoreFirst Does not waiting timeout, If this is true
 * @constructor
 */
export function debounce(timeout_or_propertyName: number | string = 240, ignoreFirst: boolean = true) {
	return function debounceMetaDecorator(method: (...args: any[]) => void, context: ClassMethodDecoratorContext) {
		return function debounceDecorator(...args: any[]) {
			let currentTimeout = getTimeout(this, timeout_or_propertyName);

			if (ignoreFirst && !method[$$debounceNonFirst]) {
				currentTimeout = 0;
			}

			clearTimeout(method[$$debounceTimer]);

			method[$$debounceTimer] = setTimeout(() => {
				method[$$debounceNonFirst] = true;

				method(...args);

				delete method[$$debounceTimer];
			}, currentTimeout, ...args);
		}
	};
}

/**
 * @version stage 2
 * @alias debounce
 * @see debounce
 */
export const Debounce = downgradeMethodDecorator(debounce);