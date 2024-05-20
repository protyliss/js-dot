import {Dynamic} from './dynamic';
import {DynamicComposeOption} from './dynamic-compose-option';
import {_DynamicComposer} from './_dynamic-composer';


class _DynamicState {
	#updates: Dynamic<any>[] = [];
	#updateTimer: any

	protected _selfUpdating = this._updating.bind(this);

	composers = new WeakMap<Dynamic<any>, Set<_DynamicComposer>>();
	collector: _DynamicComposer;

	compose(callback: () => void, option?: DynamicComposeOption) {
		return new _DynamicComposer(
			this,
			callback,
			option || {}
		);
	}

	update(dynamic: Dynamic<any>) {
		this.abort(dynamic);

		const updates           = this.#updates;
		updates[updates.length] = dynamic;

		if (!this.#updateTimer) {
			this.#updateTimer = setTimeout(this._selfUpdating);
		}
	}

	abort(dynamic: Dynamic<any>) {
		const updates    = this.#updates;
		const foundIndex = updates.indexOf(dynamic);
		if (foundIndex > -1) {
			updates.splice(foundIndex, 1);
		}
	}

	protected _updating() {
		this.#updateTimer = null;
		const updates     = this.#updates.splice(0, this.#updates.length);

		const updated       = [];
		const {length: end} = updates;
		let current         = -1;

		const {composers} = this;

		while (++current < end) {
			const dynamic = updates[current];
			if (composers.has(dynamic)) {
				for (const composer of composers.get(dynamic)) {
					if (updated.includes(composer)) {
						continue;
					}

					updated[updated.length] = composer;
					composer.call();
				}
			}
		}

		current = -1;
		while (++current < end) {
			updates[current].reset();
		}
	}
}

export const DynamicState = new _DynamicState;