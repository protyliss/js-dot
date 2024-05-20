const CASE_DELIMETER        = /[-_]|\s+/;
const LINKED_UPPERCASE = /(.)([A-Z])/g;

export function toCapitalCase(value: string) {
	const words = value
		.replace(LINKED_UPPERCASE, '$1 $2')
		.split(CASE_DELIMETER);

	const end   = words.length;
	let current = -1;

	while (++current < end) {
		const word     = words[current];
		words[current] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}
	return words.join(' ');
}
