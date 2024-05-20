/**
 * Sort Object to Sort String
 * @example
 *
 * ```js
 * // foo,!bar
 * toSortString({
 *   foo: true,
 *   bar: false
 * });
 * ```
 * @param sortObject
 */
export function toSortString(sortObject: Record<string, boolean>) {
	const sortString = [];
	for (let target in sortObject) {
		if (!sortObject.hasOwnProperty(target)) {
			continue;
		}
		const sort = sortObject[target];
		if (typeof sort === 'boolean') {
			sortString[sortString.length] = sort ? target : '!' + target;
		}
	}
	return sortString.join(',');
}
