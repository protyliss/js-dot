export function updateSortObject(sortObject, target: string, descend?: boolean) {
	if (!sortObject) {
		sortObject = {};
	}

	if (descend) {
		if (sortObject[target] === false) {
			delete sortObject[target];
		} else {
			sortObject[target] = false;
		}
	} else {
		if (sortObject[target] === true) {
			delete sortObject[target];
		} else {
			sortObject[target] = true;
		}
	}

	return sortObject;
}
