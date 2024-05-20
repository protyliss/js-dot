export function $nthAnimationDelay(selector: string, interval: number, to = 12) {
	const properties = {};
	let from         = 1;
	to++;
	while (++from < to) {
		properties[selector + `:nth-child(${from})`] = {
			animationDelay: ((from - 1) * interval) + 's'
		};
	}
	return properties;
}