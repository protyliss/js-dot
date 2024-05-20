import {Destroyable} from './destroyable';
import {DynamicComposeOption} from './dynamic-compose-option';
import {_DynamicComposer} from './_dynamic-composer';
import {DynamicState} from './_dynamic-state';

/**
 * Compose dynamic values to use and reactive function.
 *
 * @see dynamic
 * @example
 * ```js
 * const foo = dynamic('apple');
 *
 * // print apple
 * // print pineapple after called last codes.
 * compose(() => {
 *  console.log('foo is ', foo());
 * });
 *
 * foo('pineapple');
 * ```
 * @param callback
 * @param option
 */
export function compose(callback: () => void, option?: DynamicComposeOption) {
	return new DynamicComposer(DynamicState.compose(callback, option));
}

/**
 * @see compose
 */
export class DynamicComposer implements Destroyable {
	#composer: _DynamicComposer;

	constructor(composer: _DynamicComposer) {
		this.#composer = composer;
	}

	/**
	 * Stop Composing
	 */
	destroy() {
		this.#composer?.destroy();
		this.#composer = null;
	}
}