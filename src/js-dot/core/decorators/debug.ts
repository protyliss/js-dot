import {downgradeMethodDecorator} from '../functions/downgrade-method-decorator';

/**
 * Debug logging when call class method
 * @version stage 3
 */
export function debug() {
	return function debugDecoratorWrap(target: Function, context: ClassMethodDecoratorContext) {
		return function debugDecorator(this: any, ...args: any[]) {
			console.debug(`${this[Symbol.toStringTag] || this.constructor.name}.${context.name.toString()}(`, args, ')');
			return target(args);
		}
	}
}

/**
 * Debug logging when call class method
 * @versio stage 2
 */
const Debug = downgradeMethodDecorator(debug);