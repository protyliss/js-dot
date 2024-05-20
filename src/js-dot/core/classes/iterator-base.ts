/**
 * Symbol for Iterable-items of IteratorBase
 *
 * @see IteratorBase
 * @group iterator
 */
export const $$items              = Symbol('.iteratorBase.items');
export const $$mapped             = Symbol('.iteratorBase.mapped');
export const $$mappedItems        = Symbol('.iteratorBase.mappedItems');
/**
 * Symbol for Built-in map of IteratorBase
 *
 * @see IteratorBase
 * @group iterator
 */
export const $$map: unique symbol = Symbol('.iteratorBase.map');
/**
 * Symbol for Built-in map of IteratorBase
 *
 * @see IteratorBase
 * @group iterator
 */
export const $$filter             = Symbol('.iteratorBase.filter');

/**
 * Base class of Iterator
 *
 * @example Array Iterator
 * export class ArrayIterator extends IteratorBase {
 *     * [Symbol.iterator]() {
 *     		const {_items} = this;
 *     		const end = _items.length;
 *     		const current = -1;
 *     		while(++current < end){
 *     			const item = _items[current];
 *     			if(this[$$filter] && this[$$filter](item)){
 *     				if(this[$$map]){
 *     					yield this[$$map](item);
 *     				}else{
 *     					yield item;
 *     				}
 *     			}else if(this[$$map]){
 *     					yield this[$$map](item);
 *     			}else{
 *     				yield item;
 *     			}
 *     		}
 *     }
 * }
 *
 * @group iterator
 */
export abstract class IteratorBase<TTargets = any, TTarget = any, TGenerate = TTarget> implements Iterable<TGenerate>{
	/**
	 * Iterable Items
	 */
	protected [$$items]: TTargets;
	protected [$$mapped]: boolean;

	abstract [Symbol.iterator](): Iterator<TGenerate, any, undefined>;

	get length() {
		const items = this[$$items];
		return items ? items['length'] || 0 : 0;
	}


	constructor(items: TTargets) {
		this[$$items] = items;
	}




	/**
	 * Built-in map function
	 *
	 * @example
	 * class X2Iterator extends IteratorBase {
	 * 	[$$map](item){
	 * 		return item * 2;
	 * 	}
	 * }
	 */
	protected [$$map]?(item: TTarget): TGenerate;

	/**
	 * Built-in filter function
	 *
	 * @example
	 * class EventIterator extends IteratorBase {
	 * 	[$$filter](item){
	 *  	return item % 2 === 0;
	 * 	}
	 * }
	 */
	protected [$$filter]?(item: TTarget): boolean;
}
