import {ClassPropertyDecorator3Factory} from '../typings/decorator-typings';

/**
 * Downgrade Stage 3 Property Decorator to Stage 2
 * @param stage3Decorator
 */
export function downgradePropertyDecorator(stage3Decorator: ClassPropertyDecorator3Factory) {
	return function stage2MetaPropertyDecorator(...meta: Parameters<any>): PropertyDecorator {
		const metaDecorator = stage3Decorator(...meta);
		return function stage2PropertyDecorator(target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) {
			let accessGet = (obj: object) => obj[propertyKey];
			let accessSet = (obj: object, value: any) => obj[propertyKey] = value;

			if (descriptor) {
				function nothing() {
				}

				accessGet = descriptor.get ?
					obj => descriptor.get.call(obj) :
					nothing;

				accessSet = descriptor.set ?
					(obj, value) => descriptor.set.call(obj, value) :
					nothing
			}

			const context = {
				name: propertyKey,
				kind: descriptor ?
					descriptor.set ?
						'setter' :
						'getter' :
					'field',
				access: {
					has: obj => propertyKey in (obj as object),
					get: accessGet,
					set: accessSet
				}
			} as ClassFieldDecoratorContext
				| ClassSetterDecoratorContext
				| ClassGetterDecoratorContext;

			let decorated: boolean;
			let stage3Descriptor: any;

			const decorator = metaDecorator(target, context);

			function stage2DescriptorSet(value: any) {
				if (!decorated) {
					stage3Descriptor = decorator.call(this);
					decorated        = true;
				}
				if (stage3Descriptor?.set) {
					stage3Descriptor.set(value);
					return;
				}
				accessSet(this, value);
			}

			function stage2DescriptorGet() {
				if (!decorated) {
					stage3Descriptor = decorator.call(this);
					decorated        = true;
				}

				if (stage3Descriptor?.get) {
					return stage3Descriptor.get();
				}
				return accessGet(this);
			}

			return {
				set: stage2DescriptorSet,
				get: stage2DescriptorGet,
				enumerable: false,
				configurable: true
			} satisfies PropertyDescriptor
		}
	}
}