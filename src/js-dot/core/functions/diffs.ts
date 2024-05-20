export type Diffs<TBefore, TAfter> = TBefore extends object ?
	TAfter extends object ?
		{
			[K in keyof TAfter]: K extends keyof TBefore ?
			Diffs<TBefore[K], TAfter[K]> :
			TAfter[K]
		} :
		TAfter :
	TAfter;


/**
 * Returns difference item in array and property in object.
 *
 * @example
 * const a = {
 *     boolean: true,
 *     number: 1,
 *     string: 'alpha',
 *     array: [1, 2],
 *     object : {
 *         foo: 1,
 *         bar: 2
 *     },
 *     old: 'value'
 * }
 *
 * const b = {
 *     boolean: false,
 *     number: 2,
 *     string: 'bravo',
 *     array: [2, 3],
 *     object: {
 *         bar: 2,
 *         baz: 3
 *     },
 *     new: 'value'
 * }
 *
 * console.assert(
 * 	JSON.stringify(diff(a, b))
 * 	== JSON.stringify({
 *		boolean: false,
 *		number: 2,
 *		string: 'bravo',
 *		array: [3],
 *		object: {
 *		 	baz: 3
 *		},
 *		new: 'value'
 * 	})
 * );
 * @param before
 * @param after
 */
export function diffs<TBefore, TAfter>(before: TBefore, after: TAfter): Diffs<TBefore, TAfter> {
	const beforeType = typeof before;
	const afterType  = typeof after;

	if (beforeType !== afterType || afterType !== 'object') {
		return after as any;
	}

	if (Array.isArray(after)) {
		const result: any = [];
		let current       = after.length;
		while (current-- > 0) {
			const value = after[current];
			if (!(before as any[]).includes(value)) {
				result[result.length] = value;
			}
		}
		return result.length ? result : undefined;
	}

	const result: any = {};
	let changed: boolean;
	for (const property in after) {
		if (!after.hasOwnProperty(property)) {
			continue;
		}
		const value = after[property];

		if (property in (before as object)) {
			const beforeValue = before[property as any];
			if (beforeValue !== value) {
				const propertyValue = diffs(beforeValue, value);
				if (propertyValue !== undefined) {
					result[property] = diffs(beforeValue, value);
					(changed || (changed = true));
				}
			}
		} else {
			result[property] = value;
			(changed || (changed = true));
		}
	}
	return changed ? result : undefined;
}