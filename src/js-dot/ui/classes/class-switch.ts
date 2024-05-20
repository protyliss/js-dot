import {toPrefixWith} from '@js-dot/core';

export interface ClassSwitchOption {
	prefix: string;
}

/**
 * Switching Class Names
 *
 * @description
 * Set the new Class Names after remove the Previous Class Names.
 *
 * @example
 * ```js
 * const classSwitch = new ClassSwitch(document.body);
 *
 * // body.a.b
 * classSwitch.set('a', 'b');
 *
 * // body.c
 * classSwitch.set('c')
 * ```
 */
export class ClassSwitch {

	/**
	 * Get Singleton Instance from Element
	 */
	static of(element: HTMLElement, option?: Partial<ClassSwitchOption>) {
		return element['_dotClassSwitch'] || (
			element['_dotClassSwitch'] = new ClassSwitch(element, option)
		);
	}

	protected _classList: DOMTokenList;
	protected _lastClassName!: string[];
	protected _prefix: string;
	_host :any;
	constructor(element: HTMLElement, option?: Partial<ClassSwitchOption>) {
		this._host = element;
		this._classList = element.classList;
		this._prefix    = option?.prefix || '';
	}

	protected _set(...classNames: string[]) {
		const {_classList, _lastClassName} = this;

		if (_lastClassName) {
			_classList.remove(..._lastClassName);
		}

		const {_prefix} = this;
		if (_prefix) {
			classNames = toPrefixWith(classNames, _prefix);
		}

		_classList.add(...classNames);
		this._lastClassName = classNames;

		return this;
	}

	/**
	 * Set New Class Names
	 * @param classNames
	 */
	set(...classNames: string[]) {
		return this._set(...classNames);
	}

	/**
	 * Unset Class Names
	 */
	pop() {
		const {_lastClassName} = this;
		if (_lastClassName) {
			this._classList.remove(..._lastClassName);
			this._lastClassName = null;
		}

		return this;
	}
}
