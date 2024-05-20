import {ClassMethodDecorator3Factory} from '../typings/decorator-typings';

/**
 * Downgrade Stage 3 Method Decorator to Stage 2
 * @param stage3Decorator
 */
export function downgradeMethodDecorator<T extends ClassMethodDecorator3Factory>(stage3Decorator: T):
	Parameters<T>['length'] extends 0 ?
		() => MethodDecorator :
		(...meta: Parameters<T>) => MethodDecorator {
	return function stage2MetaDecorator(...meta: Parameters<T>) {
		return function stage2Decorator(target: ReturnType<T>, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
			const origin = target[propertyKey] as Function;

			const downgradeDescriptor = Object.assign({}, descriptor);

			downgradeDescriptor.value = function stage3MethodDecoratorTo2(...args: any[]) {
				const decoratedMethod = stage3Decorator(...meta)(
					origin.bind(this),
					{
						kind: 'method',
						name: propertyKey
					} as ClassMethodDecoratorContext
				);

				this[propertyKey] = function stage3MethodDecoratorTo2_replaced(...args: any[]) {
					return decoratedMethod.apply(this, args);
				}

				return this[propertyKey](...args);
			}

			return downgradeDescriptor;
		}
	} as any
}

