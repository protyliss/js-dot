export function toUsvString(queryMap: Record<string, string | number>) {
	const queryStrings = [];
	const entries = Object.entries(queryMap);
	const end = entries.length;
	let current = -1;
	while (++current < end) {
		const [name, value] = entries[current];
		queryStrings.push(name + '=' + value);
	}
	return queryStrings.join('&');
}
