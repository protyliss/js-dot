/**
 * Get a Identifiable value about wrapped with braces or not.
 *
 * @param target
 * @returns
 * 	- `false` when not wrapped with any braces
 * 	- `1` when wrapped with '(' and ')'
 * 	- `2` when wrapped with '{' and '}'
 * 	- `3` when wrapped with '[' and ']'
 */
export function isBraced(target: any) {
	if (typeof target !== 'string') {
		return false;
	}

	switch (target.charAt(0)) {
		case '(':
			return target.endsWith(')') ? 1 : false;
		case '[':
			return target.endsWith(']') ? 2 : false;
		case '{':
			return target.endsWith('}') ? 3 : false;
	}

	return false;
}

