export type ColorSource =
	string
	| number
	| Array<number | string>
	;

const _HEX_COLOR = /^#?[0-9a-f]{3,6}$/i;
const _RGBA = /^(rgba?)?\(?(\s*,?\s*(\d+|\d+\.\d+|\.\d+)?){2,4}\)?$/

/***
 * Parse Color-able to RGBA Array
 *
 * @description
 *  Acceptance format:
 *
 *  Hex string:
 *  - `#rgb`
 *  - `#rgba`
 *  - `#rrggbb`
 *  - `#rrggbbb`
 *
 *  Hex string without `#`:
 *  - `rgb`
 *  - `rgba`
 *  - `rrggbb`
 *  - `rrggbbaa`
 *
 *  rgb, rgba string:
 *  - `rgb(r, g, b)`
 *  - `rgba(r, g, b, a),`
 *
 *  rgb, rgba string without `rgb()`, `rgba()`
 *  - `rgb, a`
 *  - `r, g, b`
 *  - `r, g, b, a`
 *  - `(rgb, a)`
 *  - `(r, g, b)`
 *  - `(r, g, b, a)`
 *
 *  array:
 *  - `[r]`
 *  - `[r, a]`
 *  - `[r, g, b]`
 *  - `[r, g, b, a]`
 *
 *  keyword:
 *  - `transparent`
 *  - `blackout`
 *  - `whiteout`
 */
export function parseColor(source: ColorSource): [number, number, number, number] {
	switch (typeof source) {
		case 'string':
			switch (source) {
				case 'transparent':
				case 'blackout':
					return [0, 0, 0, 0];
				case 'whiteout':
					return [255, 255, 255, 0];
			}

			if (_HEX_COLOR.test(source)) {
				const hex = source.startsWith('#') ? source.slice(1) : source;
				const {length} = hex;

				switch (length) {
					case 3:
					case 4:
						const red = hex.charAt(0);
						const green = hex.charAt(1);
						const blue = hex.charAt(2);
						const alpha = length > 3 ? hex.charAt(3) : 'f';
						return [
							parseInt(red + red, 16),
							parseInt(green + green, 16),
							parseInt(blue + blue, 16),
							parseInt(alpha + alpha, 16) / 255,
						];

					case 6:
					case 8:
						return [
							parseInt(hex.substr(0, 2), 16),
							parseInt(hex.substr(2, 2), 16),
							parseInt(hex.substr(4, 2), 16),
							length > 6 ? parseInt(hex.substr(4, 2), 16) / 255 : 1
						];
				}
			}

			if (_RGBA.test(source)) {
				const bracket = source.indexOf('(');
				source = (bracket > -1 ? source.substring(bracket, source.lastIndexOf(')')) : source).split(',');
			}
			break;

		case 'number':
			source = [source]
			break;
	}

	if (!Array.isArray(source)) {
		throw ReferenceError(`Invalid Color Source: ${source}`);
	}

	switch (source.length) {
		case 1:
		case 2:
			const red = +source[0];
			return [red, red, red, getAlpha(source[1])];

		// case 3:
		// case 4:
	}

	return [+source[0], +source[1], +source[2], getAlpha(source[3])];
}

function getAlpha(alpha: string | number) {
	if (alpha === undefined || alpha === null) {
		return 1;
	}
	if (typeof alpha === 'string') {
		if (alpha.startsWith('.')) {
			alpha = '0.' + alpha;
		}

		return alpha.endsWith('%') ?
			+(alpha.substr(0, alpha.length - 1)) / 100 :
			+alpha
	}

	return alpha;
}
