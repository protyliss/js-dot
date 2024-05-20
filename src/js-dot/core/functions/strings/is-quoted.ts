/**
 * Get a Identifiable value about wrapped with quotes or not
 *
 * @param target
 * @returns
 * 	- `false` when target is not in quote
 * 	- 1 when target is wrapped with single quote
 * 	- 2 when target is wrapped with double quote
 */
export function isQuoted(target: any): false | 1 | 2 {
	if (typeof target !== 'string') {
		return false;
	}

	switch (target.charAt(0)) {
		case "'":
			return target.endsWith("'") ? 1 : false
		case '"':
			return target.endsWith('"') ? 2 : false
	}

	return false;
}
