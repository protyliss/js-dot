import {isQuoted} from './is-quoted';
import {isBraced} from './is-braced';

/**
 * Get a Identifiable value about JSON string or not.
 *
 * @param target
 * @return
 * 	- `false` when not a json string
 *	- `1` when wrapped with braces
 * 	- `2` when wrapped with braces in double quote
 * 	- `3` when wrapped with double quote
 */
export function isJsonString(target: any): false | 1 | 2 | 3  {
	if (typeof target !== 'string') {
		return false;
	}

	switch (isQuoted(target)) {
		case 2:
			switch (isBraced(target)) {
				case 2:
				case 3:
					return 2;
			}

			return 3
	}

	switch (isBraced(target)) {
		case 2:
		case 3:
			return 1;
	}

	return false;
}
