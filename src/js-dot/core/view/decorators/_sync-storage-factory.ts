import {casting} from '../../functions/strings/casting';

if (!globalThis['localStorage']) {
	globalThis['localStorage']   = undefined as any;
	globalThis['sessionStorage'] = undefined as any;
}

export interface SyncStorageOption {
	/**
	 * Storage Key
	 * @default class and property name
	 */
	key?: string;

	/**
	 * Use URL for generate auto storage key
	 * @default false
	 */
	useUrl?: boolean;

	/**
	 * Default Value when Storage has not a Value.
	 * @default null
	 */
	defaultValue?: any;
}

/**
 * @internal
 */
export function syncStorageDecoratorFactory(
	storage: typeof localStorage | typeof sessionStorage
) {
	return function syncStorage(
		defaultValue_or_option?: boolean | number | string | SyncStorageOption
	) {
		let option = defaultValue_or_option as SyncStorageOption;

		if (arguments.length && typeof option !== 'object') {
			option = {
				defaultValue: option
			};
		}

		return function syncStorageMetaDecorator(
			target: any,
			context: ClassFieldDecoratorContext
				| ClassGetterDecoratorContext
				| ClassSetterDecoratorContext
		) {
			const key = getKey(target, context.name, option);

			return function syncStorageDecorator() {
				const storaged = storage.getItem(key);
				if (storaged === null || storaged === undefined && option && 'defaultValue' in option) {
					storage.setItem(key, option.defaultValue);
				}

				function syncStorageSetter(value: any) {
					switch (value) {
						case null:
						case undefined:
							storage.removeItem(key);
							break;
						default:
							storage.setItem(key, value);
					}
				}

				function syncStorageGetter() {
					return casting(storage.getItem(key));
				}

				const {kind} = context;

				if (kind === 'field') {
					return {
						set: syncStorageSetter,
						get: syncStorageGetter,
						enumerable: true,
						configurable: true
					} as PropertyDescriptor
				}

				const self = this;
				const access    = context.access as any;
				return {
					set(value: any) {
						access.set(self, value);
						syncStorageSetter(access.get(self) || value);
					},
					get() {
						syncStorageSetter(access.get(self));
						return syncStorageGetter();
					},
					enumerable: false,
					configurable: true
				} as PropertyDescriptor

			}
		}
	}

	function getKey(target: any, name: string | symbol, option?: SyncStorageOption) {
		if (option?.key) {
			return option.key;
		}

		let key = '@syncStorage.' + target.constructor.name + '.' + name.toString();
		if (option?.useUrl && 'location' in globalThis) {
			key += '.' + (globalThis.location.href || '*');
		}

		return key;
	}
}