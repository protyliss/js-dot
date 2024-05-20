import {ColorSource, parseColor} from './parse-color';

/***
 * Get rgb() from Color-able source
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
export function toRgb(source: ColorSource) {
    const [r, g, b, a] = parseColor(source);
    return `rgb(${r}, ${g}, ${b})`;
}
