import {WeakIdBase} from './weak-id-base';

/**
 * WeakMap with WeakKey as string
 *
 * @example Default
 * const map = new WeakIdMap();
 *
 * map.set('foo', true);
 * map.set('bar', false);
 *
 * // returns true
 * map.has('foo');
 *
 * map.delete('bar');
 *
 * // return false
 * map.has('bar');
 *
 * @example Sharing ID
 * const ids = new WeakIds();
 * const a = new WeakIdMap();
 * const b = new WeakIdMap();
 *
 * a.set('foo', 1);
 * b.set('foo', 2);
 *
 * ids.delete('foo');
 *
 * // returns false
 * a.has('foo');
 * b.has('foo');
 */
export class WeakIdMap<V = any> extends WeakIdBase implements WeakMap<any, any> {
	readonly [Symbol.toStringTag] = 'WeakIdMap';

	#map = new WeakMap;

	get(id: string): V {
		const key = this._ids.get(id);
		return key ? this.#map.get(key) : undefined;
	}

	set(id: string, value: V) {
		const key = this._ids.add(id);
		return key ? this.#map.set(key, value) : this as any;
	}

	/**
	 * The `update()` method of WeakIdMap instances Update element with a specified key and value as result of callback to this WeakIdMap.
	 *
	 * @example
	 * const map = new WeakIdMap();
	 * map.set('a', 1);
	 * map.update('a', currentValue => currentValue + 1);
	 *
	 * // returns 2
	 * map.get('a');
	 *
	 * @param id
	 * @param callback
	 */
	update(id: string, callback: (currentValue: V) => V){
		const key = this._ids.add(id);
		this.#map.set(
			key,
			callback(this.#map.get(key))
		);
		return this;
	}

	has(id: string) {
		const key = this._ids.add(id);
		return key ? this.#map.has(key) : false;
	}

	delete(id: string) {
		const key = this._ids.get(id);
		return key ? this.#map.delete(key) : false;
	}
}