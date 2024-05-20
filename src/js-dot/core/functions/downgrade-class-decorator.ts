import {ClassDecorator3Factory} from '../typings/decorator-typings';

/**
 * Downgrade Stage 3 Class Decorator to Stage 2
 * @param stage3Decorator
 */
export function downgradeClassDecorator<T extends ClassDecorator3Factory>(stage3Decorator: T):
	Parameters<T>['length'] extends 0 ?
		() => ClassDecorator :
		(...meta: Parameters<T>) => ClassDecorator {
	return function stage2MetaClassDecorator(...meta: Parameters<T>) {
		return function stage2ClassDecorator(target: any) {
			const initializers = [];
			const Extended     = stage3Decorator(...meta)(
				target,
				{
					kind: 'class',
					name: target.name,
					addInitializer(initializer: (this: { new(...args: any): any }) => void) {
						initializers[initializers.length] = initializer;
					}
				} as ClassDecoratorContext
			);

			const Base  = Extended || target;
			const end   = initializers.length;
			let current = -1;
			while (++current < end) {
				initializers[current].call(Base);
			}

			return Base;
		}
	} as any
}
