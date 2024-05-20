/**
 * Get Multiple Paths from Split Path Pattern
 * @example
 * ```js
 * // ['foo/bar', 'foo/baz']
 * parsePath('foo/bar|baz');
 *
 * // ['foo/bar/qux', 'foo/baz/qux']
 * parsePath('foo/bar|baz|qux');
 * ```
 * @param path
 * @param separator
 */
export function multiplePath(path: string, separator = '|'): string[] {
	if (!path) {
		return [];
	}

	if (!path.includes(separator)) {
		return [path];
	}

	const result = [];
	const segments = path.split('/');
	const end      = segments.length;
	let current    = -1;
	while (++current < end) {
		const segment = segments[current];

		if (!segment.includes(separator)) {
			continue;
		}

		const slugs     = segment.split(separator);
		const slugEnd   = slugs.length;
		let slugCurrent = -1;
		while (++slugCurrent < slugEnd) {
			segments[current] = slugs[slugCurrent];
			const sub         = segments.join('/');
			result.includes(sub) || result.push(...multiplePath(sub, separator));
		}
	}

	return result;
}

