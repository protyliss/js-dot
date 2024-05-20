import {$$filter, $$items, $$map, $$mapped, IteratorBase} from './iterator-base';

/**
 * Base class for makes Array Iterator.
 *
 * @example Basic Usage, But it's not enough to replace an array.
 * class ArrayIterator extends ArrayIteratorBase {
 * }
 *
 * for(const item of (new ArrayIterator([1, 2, 3]))){
 *     // 1
 *     // 2
 *     // 3
 * }
 *
 * @example Built-in map
 * class X10Iterator extends ArrayIteratorBase {
 *     [$$map](item){
 *         return item * 10
 *     }
 * }
 *
 * for(const item of (new ArrayIterator([1, 2, 3]))){
 *     // 10
 *     // 20
 *     // 30
 * }
 *
 * @example Built-in filter
 * class EvenIterator extends ArrayIteratorBase {
 *     [$$filter](item){
 *         return item % 2 === 0
 *     }
 * }
 *
 * for(const item of (new EvenIterator([1, 2, 3]))){
 *     // 2
 * }
 */
export abstract class ArrayIteratorBase<TItem = any, TGenerate = TItem>
	extends IteratorBase<TItem[], TItem, TGenerate> {
	protected _iterMapApplied = [];

	* [Symbol.iterator]() {
		const items = this[$$items] as any;
		const end   = items.length;
		let current = -1;

		let filterFunction = this[$$filter];
		let mapFunction    = this[$$map];
		if (filterFunction) {
			filterFunction = filterFunction.bind(this);
			if (!this[$$mapped] && mapFunction) {
				mapFunction             = mapFunction.bind(this);
				const {_iterMapApplied} = this;
				while (++current < end) {
					let item = items[current];

					if (filterFunction(item)) {
						if (!_iterMapApplied[current]) {
							item                     = mapFunction(items[current]);
							_iterMapApplied[current] = true;
							items[current]           = item;
						}

						yield item;
					}
				}
				this[$$mapped] = true;
			} else {
				while (++current < end) {
					const item = items[current];
					if (filterFunction(item)) {
						yield item;
					}
				}
			}
		} else {
			if (!this[$$mapped] && mapFunction) {
				mapFunction             = mapFunction.bind(this);
				const {_iterMapApplied} = this;
				while (++current < end) {
					let item = items[current];

					if (!_iterMapApplied[current]) {
						item                     = mapFunction(item);
						_iterMapApplied[current] = true;
						items[current]           = item;
					}

					yield item;
				}
				this[$$mapped] = true;
			} else {
				while (++current < end) {
					yield items[current];
				}
			}
		}
	}

	protected _getByIndex(index: number) {
		const items = this[$$items];
		let item    = items[index];

		if (this[$$map] && !this._iterMapApplied[index]) {
			item                        = this[$$map](item) as any;
			items[index]                = item;
			this._iterMapApplied[index] = true;
		}

		return item;
	}

	/**
	 * Get N-th item
	 * @param index
	 */
	get(index: number) {
		if (index >= this.length) {
			return undefined;
		}

		return this._getByIndex(index);
	}

	/**
	 * @see Array.prototype.map
	 */
	map<T>(callback: (value: TGenerate, index: number, array: this) => T, thisArg?: any): T[] {
		if (thisArg) {
			callback = callback.bind(thisArg);
		}
		let index    = 0;
		const result = [];
		for (const value of this) {
			result[index] = callback(value, index++, this);
		}

		return result;
	}

	/**
	 * @see Array.prototype.forEach
	 */
	forEach(callback: (value: TGenerate, index: number, array: this) => void, thisArg?: any): void {
		if (thisArg) {
			callback = callback.bind(thisArg);
		}
		let index = 0;
		for (const value of this) {
			callback(value, index++, this);
		}
	}

	/**
	 * @see Array.prototype.slice
	 */
	slice(start: number, end?: number): TGenerate[] {
		const sliced = [];
		let current  = start;

		end = end ? Math.min(end, this.length) : this.length;

		while (++current < end) {
			sliced[sliced.length] = this._getByIndex(current);
		}

		return sliced;
	}
}
