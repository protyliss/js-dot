import {DynamicState} from './_dynamic-state';

/**
 * Dynamic changeable value for reactive to compose
 */
export class Dynamic<T> {
	protected _previousOldValue: T;

	protected _previousValue: T;
	protected _value: T;
	protected _changed: boolean;

	/**
	 * Get a previous value
	 */
	get previousValue() {
		return this._previousValue;
	}

	/**
	 * Get a current value
	 */
	get value() {
		return this._value;
	}

	/**
	 * Get a boolean whether value has changed
	 */
	get changed() {
		return this._changed;
	}

	constructor(defaults: T) {
		this._value         = defaults;
		this._previousValue = defaults;
		this._changed       = true;
	}

	/**
	 * Set a current value
	 * @param value New value
	 */
	set(value: T) {
		const {collector} = DynamicState;
		if (collector && !collector.option.write) {
			throw new ReferenceError('Cannot Set dynamic value in compose function');
		}
		if (value === this._previousValue) {
			this._value            = this._previousValue;
			this._previousValue    = this._previousOldValue;
			this._previousOldValue = null;
			this._changed          = false;
			DynamicState.abort(this);
		} else if (value !== this._value) {
			this._previousOldValue = this._previousValue;
			this._previousValue    = this._value;
			this._value            = value;
			this._changed          = true;
			DynamicState.update(this);
		}
	}

	/**
	 * Get a current value
	 */

	get() {
		DynamicState.collector?.collect(this);
		return this._value;
	}

	/**
	 * Mark as not changed
	 * @param value
	 */
	reset(value?: T) {
		this._changed = false;
		if (arguments.length) {
			this._previousOldValue = this._previousValue;
			this._previousValue    = this._value;
			this._value            = value;
		}
	}
}

