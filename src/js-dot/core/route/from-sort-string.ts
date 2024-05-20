export function fromSortString(sortString: string): Record<string, boolean> {
	if (!sortString) {
		return {};
	}

	const object = {};
	const sorts  = sortString.split(',');
	const end    = sorts.length;
	let current  = -1;
	while (++current < end) {
		const sort = sorts[current];
		if (sort.startsWith('!')) {
			object[sort.substring(1)] = false;
		} else {
			object[sort] = true;
		}
	}
	return object;
}
