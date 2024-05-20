import {ArrayIteratorBase} from './array-iterator-base';
import {$$filter, $$items, $$map, $$mapped} from './iterator-base';

const $$sliceEnd = Symbol('.ArraySlicesIterator.slicesEnd');

/**
 * Pre-Sliced Array Iterator
 */
export class ArraySlicesIterator<TItem> extends ArrayIteratorBase<TItem> {
	protected [$$sliceEnd]: number;

	// @ts-ignore
	* [Symbol.iterator]() {
		const sliceEnd = this[$$sliceEnd];
		if (this[$$filter] || (this[$$map] && !this[$$mapped])) {
			const sliced = [];
			let count    = 0;
			for (let item of super[Symbol.iterator]()) {
				sliced[count++] = item;
				if (count === sliceEnd) {
					yield sliced.splice(0, sliceEnd);
				}
			}
		} else {
			const items = this[$$items];
			const end   = this.length;
			let offset  = 0;
			while (offset < end) {
				yield items.slice(offset, offset += sliceEnd);
			}
		}
	}

	constructor(items: TItem[], sliceEnd: number) {
		super(items);
		this[$$sliceEnd] = sliceEnd;
	}
}
