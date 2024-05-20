import {$$items, $$map, $$mapped, IteratorBase} from './iterator-base';

export const $$keys    = Symbol('.ObjectIteratorBase.keys');
export const $$entries = Symbol('.ObjectIteratorBase.entries');
const {keys: KEYS}     = Object;

/**
 * @example
 * class ValueStringArrayIterator extends ObjectEntriesIterator {
 * 	[$$map](item){
 * 		return item.split('');
 * 	}
 * }
 *
 * for(const [key, chars] of (new ValueStringArrayIterator({foo: 'foo', bar: 'bar}){
 *     // ['foo', ['f', 'o', 'o']]
 *     // ['bar', ['b', 'a', 'r']]
 * }
 *
 * @todo support $$filter
 */
export abstract class ObjectEntriesIteratorBase<TObject extends object = any,
	TGenerate = TObject[Extract<keyof TObject, string>],
	TKey extends string = Extract<keyof TObject, string>,
	TEntry = [TKey, TObject[Extract<keyof TObject, string>]]
> extends IteratorBase<TObject, TEntry, TGenerate> {
	protected [$$keys]: TKey[];
	protected [$$entries]: TEntry[];

	override get length() {
		return this.keys().length;
	}

	* [Symbol.iterator](): Iterator<TGenerate> {
		const items              = this[$$items];
		let entries              = this[$$entries] as any;

		if (entries) {
			const end   = entries.length;
			let current = -1;
			while (++current < end) {
				const entry = entries[current];
				yield entry;
			}
		} else {
			let mapFunction = this[$$map];
			if (mapFunction && !this[$$mapped]) {
				mapFunction    = mapFunction.bind(this);
				this[$$mapped] = true;

				entries = [];

				const keys  = [];
				let current = 0;
				for (let key in items) {
					if (!items.hasOwnProperty(key)) {
						continue;
					}

					let entry = entries[current];
					if (!entry) {
						entry            = mapFunction([key, items[key]] as TEntry);
						entries[current] = entry;
					}

					keys[current] = key;

					yield entry;

					current++;
				}
				this[$$keys]    = keys;
				this[$$entries] = entries;
			}
		}
	}

	/**
	 * @alias Object.keys()
	 */
	keys() {
		return this[$$keys] || (
			this[$$keys] = KEYS(this[$$items]) as TKey[]
		);
	}
}
