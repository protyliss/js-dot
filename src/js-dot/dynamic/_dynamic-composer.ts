import {Destroyable} from './destroyable';
import {Dynamic} from './dynamic';
import {DynamicComposeOption} from './dynamic-compose-option';
import {DynamicState} from './_dynamic-state';

export class _DynamicComposer implements Destroyable {
	protected _selfCall    = this._call.bind(this);
	protected _callTimer: any;
	protected _dynamicRefs = new Set<WeakRef<Dynamic<any>>>();

	constructor(
		protected state: typeof DynamicState,
		protected callback: () => void,
		public option: DynamicComposeOption
	) {
		state.collector = this;
		this._call();
		state.collector = null;
	}

	collect(dynamic: Dynamic<any>) {
		const {state: {composers}} = this;
		if (composers.has(dynamic)) {
			composers.get(dynamic).add(this);
		} else {
			composers.set(dynamic, new Set([this]));
		}

		this._dynamicRefs.add(
			new WeakRef(dynamic)
		);
	}

	call() {
		const {option: {throttle, debounce}} = this;
		if (throttle) {
			if (!this._callTimer) {
				this._callTimer = setTimeout(this._selfCall, throttle)
			}
		} else if (debounce) {
			clearTimeout(this._callTimer);
			this._callTimer = setTimeout(this._selfCall, debounce);
		} else {
			this._call();
		}
	}

	protected _call() {
		this.callback();
		this._callTimer = null;
	}

	destroy(): void | Promise<void> {
		const {composers} = this.state;

		for (let ref of this._dynamicRefs) {
			const dynamic = ref.deref();

			if (!dynamic || !composers.has(dynamic)) {
				continue;
			}

			composers.get(dynamic).delete(this);
		}
	}
}