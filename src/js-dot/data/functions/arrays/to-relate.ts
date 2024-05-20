import {arrayify} from '@js-dot/core';
/**
 * Include related items within the Group Item as a child property
 * with map function
 *
 * @example
 *
 * ```js
 * // [
 * //  {no: 1, items: [ {relate: 1, add: true}] },
 * //  {no: 2, items: [ {relate: 2, add: true}] },
 * // ]
 * const relatedItems = toRelate(
 *  [
 *      {no: 1},
 *      {no: 2}
 *  ],
 *  [
 *      {relate: 1},
 *      {relate: 2}
 *  ],
 *  {
 *      primaryProperty: 'no',
 *      relateProperties: ['relate'],
 *      map: item => {
 *      	item['add'] = true;
 *      	return item
 *      }
 *  }
 * );
 * ```
 *
 * @param groupItems
 * @param relateItems
 * @param option
 */
// @ts-ignore
export function toRelate<TGroupItem extends object,
	TRelateItem extends object,
	TReturns,
	TItemsProperty extends string = 'items'
>(
	groupItems: TGroupItem[],
	relateItems: TRelateItem[],
	option: {
		itemsProperty?: TItemsProperty,
		primaryProperty: keyof TGroupItem,
		relateProperties: keyof TRelateItem | Array<keyof TRelateItem>,
		map: (relateItem: TRelateItem, groupItem?: TGroupItem) => TReturns
	}
): (TGroupItem & { [K in TItemsProperty]: TReturns[] })[];

/**
 * Include related items within the Group Item as a child property.
 *
 * @example
 *
 * ```js
 * // [
 * //  {no: 1, items: [ {relate: 1}] },
 * //  {no: 2, items: [ {relate: 2}] },
 * // ]
 * const relatedItems = toRelate(
 *  [
 *      {no: 1},
 *      {no: 2}
 *  ],
 *  [
 *      {relate: 1},
 *      {relate: 2}
 *  ],
 *  {
 *      primaryProperty: 'no',
 *      relateProperties: ['relate']
 *  }
 * );
 * ```
 *
 * @param groupItems
 * @param relateItems
 * @param option
 */
export function toRelate<TGroupItem extends object,
	TRelateItem extends object,
	TItemsProperty extends string = 'items'
>(
	groupItems: TGroupItem[],
	relateItems: TRelateItem[],
	option: {
		itemsProperty?: TItemsProperty,
		primaryProperty: keyof TGroupItem,
		relateProperties: keyof TRelateItem | Array<keyof TRelateItem>
	}
): (TGroupItem & { [K in TItemsProperty]: TRelateItem[] })[];


export function toRelate(
	groupItems: object[],
	relateItems: object[],
	option: {
		itemsProperty?: string,
		countsProperty?: string,
		parentProperty?: string,
		primaryProperty: string,
		relateProperties: string | string[],
		map?: (relateItem: object) => object
	}) {
	const {primaryProperty, itemsProperty, countsProperty, map} = {
		itemsProperty: 'items',
		countsProperty: 'counts',
		...option
	};

	const relateProperties = arrayify(option.relateProperties);

	const relatedItems = {} as Record<string, any>;

	let current = groupItems.length;

	while (current-- > 0) {
		const groupItem                          = groupItems[current];
		groupItem[itemsProperty]                 = [];
		relatedItems[groupItem[primaryProperty]] = groupItem;
	}

	current                       = -1;
	const {length: relatesLength} = relateProperties;
	const end                     = relateItems.length;

	if (map) {
		while (++current < end) {
			const relateItem = relateItems[current];

			let relateCurrent = relatesLength;
			while (relateCurrent-- > 0) {
				const relateValue = relateItem[relateProperties[relateCurrent]];
				if (relateValue) {
					const relatedGroupItem = relatedItems[relateValue];

					if (relatedGroupItem) {
						const relatedGroupItemItems: any[] = relatedGroupItem[itemsProperty]
						if (!relatedGroupItemItems.includes(relateItem)) {
							relatedGroupItemItems[relatedGroupItemItems.length] = map(relateItem);
						}
					}
				}
			}
		}
	} else {
		while (++current < end) {
			const relateItem = relateItems[current];

			let relateCurrent = relatesLength;
			while (relateCurrent-- > 0) {
				const relateValue = relateItem[relateProperties[relateCurrent]];
				if (relateValue) {
					const relatedGroupItem = relatedItems[relateValue];

					if (relatedGroupItem) {
						const relatedGroupItemItems = relatedGroupItem[itemsProperty];
						if (!relatedGroupItemItems.includes(relateItem)) {
							relatedGroupItemItems[relatedGroupItemItems.length] = relateItem;
						}
					}
				}
			}
		}
	}

	return groupItems;
}