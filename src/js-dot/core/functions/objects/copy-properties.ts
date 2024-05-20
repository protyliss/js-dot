const {
		  getOwnPropertyDescriptors: GET_OWN_PROPERTY_DESCRIPTORS,
		  getOwnPropertyNames: GET_OWN_PROPERTY_NAMES,
		  defineProperty: DEFINE_PROPERTY
	  } = Object;

const PROPERTY_AND_DESCRIPTORS = new WeakMap();

/**
 * Define property to target property from source as use getter and setter.
 *
 * @param source
 * @param target
 */
export function copyProperties(source: object, target: object) {
	const {constructor} = source;

	if (!PROPERTY_AND_DESCRIPTORS.has(constructor)) {
		PROPERTY_AND_DESCRIPTORS.set(
			constructor,
			[
				GET_OWN_PROPERTY_NAMES(constructor),
				GET_OWN_PROPERTY_DESCRIPTORS(constructor.prototype)
			]
		)
	}

	const [properties, descriptors] = PROPERTY_AND_DESCRIPTORS.get(constructor);

	let current = properties.length;
	while (current-- > 0) {
		const property = properties[current];
		if (target.hasOwnProperty(property) || !source.hasOwnProperty(property)) {
			continue;
		}

		DEFINE_PROPERTY(target, property, {
			get() {
				return source[property];
			},
			set(value) {
				source[property] = value;
			}
		});
	}

	for (let property in descriptors) {
		if (property === 'constructor' || target.hasOwnProperty(property)) {
			continue;
		}

		DEFINE_PROPERTY(target, property, {
			get(): any {
				return source[property];
			},
			set(value) {
				source[property] = value;
			}
		});
	}

	return source;
}