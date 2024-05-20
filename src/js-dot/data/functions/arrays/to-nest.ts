export type NestedResult<T extends object, U extends string, V extends T> = V & {
	[K in U]: NestedResult<V, U, V>[];
}


export interface ToNestMapCallback<T, V> {
	(child: T, parent?: V): V;
}
export type ToNestOption<T extends object, U extends string, V extends T = T> = {
	/**
	 * Property name for child array of nested structure
	 * @default 'children'
	 */
	children?: U,
	/**
	 * Ignore Error when cannot found upper item
	 * @default true
	 */
	throwError?: boolean
	/**
	 * forEach function
	 */
	map?: ToNestMapCallback<T, V>
	// map?: (child: T, parent?: T) => V
} & ({
	/**
	 * Property name for make items to sort, If items has not sorted.
	 */
	sort?: keyof T
} | {
	/**
	 * Comparer function for make items to sort, If items has not sorted.
	 */
	sorter?: ((a: T, b: T) => number)
}) & ({
	/**
	 * Property name for get a Unique value to identify item
	 */
	primary: keyof T;
	/**
	 * Property Name for get a parent item's value of Primary Key
	 */
	parent: keyof T;
} | {

	/**
	 * Property name for get a depth of nest
	 */
	depth: keyof T;
});

/**
 * Object array as Flatted Structure to Nested Structure.
 *
 * @example Items have Primary Value as Unique and Parent's Primary Value
 * ```js
 * // {
 * //   no: 1,
 * //   parent: null,
 * //   children: [
 * //       {
 * //           no: 2,
 * //           parent: 1,
 * //           children: [
 * //               {
 * //                   no: 3,
 * //                   parent: 2
 * //               }
 * //           ]
 * //       }
 * //   ]
 * // }
 * const nested = toNest(
 *  [
 *      {no: 1, parent: null},
 *      {no: 2, parent: 1},
 *      {no: 3, parent: 2}
 *  ],
 *  {
 *      primary: 'no',
 *      parent: 'parent'
 *  }
 * );
 * ```
 *
 * @example Items have depth for nesting
 * ```js
 * // {
 * //   no: 1,
 * //   depth: 0,
 * //   children: [
 * //       {
 * //           no: 2,
 * //           depth: 1,
 * //           children: [
 * //               {
 * //                   no: 3,
 * //                   depth: 2
 * //               }
 * //           ]
 * //       }
 * //   ]
 * // }
 * const nested = toNest(
 *  [
 *      {no: 1, depth: 0},
 *      {no: 2, depth: 1},
 *      {no: 3, depth: 2}
 *  ],
 *  {
 *      depth: 'depth',
 *  }
 * );
 * ```
 *
 * @example if items does not sorted, using `sort` and `sorter` option
 * ```js
 * const nested = toNest(
 *  [
 *      {no: 3, depth: 2, value: 3}
 *      {no: 2, depth: 1, value: 2},
 *      {no: 1, depth: 0, value: 1}
 *  ],
 *  {
 *      depth: 'depth',
 *      sort: 'value'
 *  }
 * );
 * ```
 *
 * @example Extra process on each loop
 * ```js
 * // [
 * // 		[
 * // 			no:1,
 * // 			depth: 0
 * // 			children: [
 * // 				[
 * // 					no:2,
 * //  				depth: 1
 * //  				children: [],
 * //  				mapped: true
 * // 			]
 * // 			],
 * // 			mapped: true
 * // 		]
 * // ]
 * const nested = toNest(
 * 	[
 * 		[no:1, depth: 0],
 * 		[no:2, depth: 1]
 * 	],
 * 	{
 * 		depth: 'depth',
 * 		map: child => {
 * 			// typing for new properties
 * 			const newChild = child as typeof child & {mapped: boolean};
 * 			newChild.mapped = true;
 * 			return newChild;
 * 	}
 * )
 * ```
 *
 * @param items
 * @param option
 */
export function toNest<T extends object, U extends string = 'children', V extends T = T>(
	items: T[],
	option: ToNestOption<T, U, V>
): NestedResult<T, U, V>[] {

	option = {
		children: 'children' as U,
		throwError: true,
		...option
	}

	const nestedItems: NestedResult<T, U, V>[] = []
	const {children, throwError}               = option;
	const flatMap                              = {};
	const map                                  = option['map'];
	const sort                                 = option['sort'];
	const sorter                               = option['sorter'];
	const primary                              = option['primary'];
	const parent                               = option['parent'];
	const depth                                = option['depth'];

	const push = (item, isChild, key) => {
		if (isChild) {
			const parent = flatMap[key];
			if (parent) {
				const parentChildren = parent[children];
				map && (item = map(item, parent));
				parentChildren[parentChildren.length] = item;
			} else if (throwError) {
				throw new SyntaxError('Cannot found a parent item.');
			}
		} else {
			map && (item = map(item));
			nestedItems[nestedItems.length] = item;
		}
	}

	const end = items.length;
	let current: number;

	if (primary && parent) {
		if (sort) {
			current = -1;
			while (++current < end) {
				const item     = items[current] as NestedResult<T, U, V>;
				item[children] = [] as any;

				const primaryValue    = item[primary] as any;
				flatMap[primaryValue] = item;
			}

			current = -1;
			while (++current < end) {
				const item        = items[current] as NestedResult<T, U, V>;
				const parentValue = item[parent];
				push(item, parentValue, parentValue);
			}
		} else {
			if (sorter) {
				items.sort(sorter);
			}
			current = -1;
			while (++current < end) {
				const item     = items[current] as NestedResult<T, U, V>;
				item[children] = [] as any;

				const primaryValue    = item[primary] as any;
				flatMap[primaryValue] = item;

				const parentValue = item[parent];
				push(item, parentValue, parentValue);
			}
		}
	} else if (depth) {
		if (sort) {
			items.sort((a, b) => a[sort] - b[sort]);
		} else if (sorter) {
			items.sort(sorter);
		}

		current = -1;
		while (++current < end) {
			const item     = items[current] as NestedResult<T, U, V>;
			item[children] = [] as any;

			const depthValue    = item[depth] as any;
			flatMap[depthValue] = item;

			push(item, depthValue, depthValue - 1);
		}
	} else {
		throw new SyntaxError('Does not support current configure of option');
	}


	return nestedItems;
}
