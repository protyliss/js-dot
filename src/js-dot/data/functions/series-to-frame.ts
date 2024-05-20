export interface SeriesToFrameOption {
	/**
	 * @default false
	 */
	transpose?: boolean;
	/**
	 * @default undefined;
	 */
	map?: (value: any, index: number) => any
}

/**
 * Serialized Values transform as Dataframe

 * @example
 * ```js
 * seriesToFrame([1, 2, 3, 4, 5, 6], 2);
 * ```
 *
 * Result:
 * ```js
 * [
 *  [1, 2],
 *  [3, 4],
 *  [5, 6]
 * ]
 * ```
 *
 * ```js
 * seriesToFrame([1, 2, 3, 4, 5, 6], 2, true);
 * ```
 *
 * Result:
 * ```js
 * [
 *  [1, 3, 5],
 *  [2, 4, 6]
 * ]
 * ```
 * @param target
 * @param size
 * @param transpose
 */
export function seriesToFrame(target: number[], size: number, {
	transpose,
	map
}: SeriesToFrameOption) {
	const result = [];
	const end    = target.length;

	if (transpose) {
		let current = size;
		while (current-- > 0) {
			result[result.length] = [];
		}
		current = -1;
		if (map) {
			while (++current < end) {
				const column  = result[current % size];
				const index   = column.length;
				column[index] = map(target[current], index);
			}
		} else {
			while (++current < end) {
				const column          = result[current % size];
				column[column.length] = target[current];
			}
		}
	} else {
		let offset = 0;
		if (map) {
			while (offset < end) {
				const slices = [];
				const end    = offset + size;
				while (offset < end) {
					const index   = slices.length;
					slices[index] = map(target[offset], index);
				}
				result[result.length] = slices;
			}
		} else {
			while (offset < end) {
				result[result.length] = target.slice(offset, offset += size);
			}
		}
	}
	return result;
}

