import {WeakIdBase} from './weak-id-base';


/**
 * WeakSet with string
 *
 * @example Default
 * const set = new WeakIdSet();
 *
 * set.add('foo');
 * set.add('bar');
 *
 * // returns true
 * set.has('foo');
 *
 * set.delete('bar');
 *
 * // returns false
 * set.has('bar');
 *
 * @example Sharing ID
 * const ids = new WeakIds();
 * const a = new WeakIdSet();
 * const b = new WeakIdSet();
 *
 * a.set('foo');
 * b.set('foo');
 *
 * ids.delete('foo');
 *
 * // return false
 * a.has('foo');
 * b.has('foo');
 */
export class WeakIdSet<T = any> extends WeakIdBase implements WeakSet<any> {
	readonly [Symbol.toStringTag] = 'WeakIdSet';

	#set = new WeakSet();

	/**
	 * @inheritdoc
	 * @param id as WeakId
	 */
	add(id: string) {
		this.#set.add(this._ids.add(id));
		return this;
	}

	/**
	 * @inheritdoc
	 * @param id as WeakId
	 */
	delete(id: string) {
		return this.#set.delete(this._ids.get(id));
	}

	/**
	 * @inheritdoc
	 * @param id as WeakId
	 */
	has(id: string) {
		return this.#set.has(this._ids.get(id));
	}
}