import {MiniConsole} from '../typings/console-like';

const nothing = (...args: any) => {
};

class PrimitiveLoggerConstructor<TType extends string> {
	#typeLevels: Record<TType, false | keyof MiniConsole>;
	#logger: MiniConsole = console;
	#enable: boolean;

	set logger(logger: MiniConsole){
		logger.warn('`logger` property setter is deprecated, using `.setLogger()` method');
		this.#logger = logger;
	}

	constructor(typeLevels: Record<TType, keyof MiniConsole>) {
		this.#typeLevels = typeLevels;

		const properties: Record<TType, PropertyDescriptor> = {} as any;
		for (const key in typeLevels) {
			if (!typeLevels.hasOwnProperty(key)) {
				continue;
			}
			properties[key] = {
				set(level: false | keyof MiniConsole){
					this.#logger.warn(`\`${key}\` property setter is deprecated, using \`.setLevel()\` method`);
					this.setLevel(key, level);
				},
				get() {
					const level = typeLevels[key];
					return this.#enable && level ?
						this.#logger[level] :
						nothing;
				}
			}
		}

		Object.defineProperties(this, properties);
	}

	/**
	 * Enable logging
	 * @param flag
	 */
	enable(flag = true){
		this.#enable = flag;
	}

	/**
	 * Disable logging
	 * @param flag
	 */
	disable(flag = true){
		this.#enable = !flag;
	}

	/**
	 * Set logger to logging
	 * @param logger
	 */
	setLogger(logger: MiniConsole) {
		this.#logger = logger;
	}

	/**
	 * Set log level
	 * @param type
	 * @param level
	 */
	setLevel(type: TType, level: false | keyof MiniConsole) {
		this.#typeLevels[type] = level;
	}
}

/**
 * @beta
 */
export const PrimitiveLogger = PrimitiveLoggerConstructor as {
	new<TType extends string>(typeLevels: Record<TType, any>): PrimitiveLoggerConstructor<TType> & {
		[K in TType]: MiniConsole[keyof MiniConsole];
	};
};