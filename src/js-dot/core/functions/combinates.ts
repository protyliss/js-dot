import {toFlat} from './arrays/to-flat';

export function combinates(item: number | string | Array<number | string>, ...moreItems: Array<number | string>) {
	const items = toFlat([item, moreItems])

	const end   = items.length;
	const slent = Math.pow(2, end);

	const results: any[] = [];

	let result;
	let current = -1;
	let order;
	while (++current < slent) {
		result = [];
		order  = -1;
		while (++order < end) {
			if (current & Math.pow(2, order)) {
				result.push(items[order]);
			}
		}

		if (result.length) {
			results.push(result);
		}
	}

	return results;
}
