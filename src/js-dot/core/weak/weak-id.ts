/**
 * Collection of String-base WeakKeys
 * Combination with WeakIdSet or WeakIdMap
 *
 * @example
 * const ids = new WeakIds();
 * const set = new WeakIdSet(ids);
 * const map = new WeakIdMap(ids);
 *
 * set.add('foo', 1);
 * map.add('foo', 2);
 *
 * ids.delete('foo');
 *
 * // returns false
 * set.has('foo');
 * map.has('foo');
 *
 */
export class WeakIds {
	#map = new Map<string, WeakId>();

	get(id: string) {
		return this.#map.get(id);
	}

	add(id: string) {
		const map = this.#map;

		if (!map.has(id)) {
			map.set(id, new WeakId(this, id))
		}

		return map.get(id);
	}

	delete(id: string) {
		this.#map.delete(id);
	}
}

/**
 * String-base WeakKey
 */
export class WeakId {
	protected _ids: WeakIds;
	protected _id: string;

	get ids() {
		return this._ids;
	}

	get id() {
		return this._id;
	}

	constructor(ids: WeakIds, id: string) {
		this._ids = ids;
		this._id  = id;
	}

	delete() {
		this.ids.delete(this.id);
	}
}