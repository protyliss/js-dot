/**
 * toWrapString, fromWrapString Option
 */
export interface ToWrapStringOption {
	/**
	 * most-left additional character
	 * @default ""
	 */
    firstStarts?: string
	/**
	 * item starts with this character
	 */
    starts?: string
	/**
	 * item ends with this character, using starts when empty
	 * @default starts | ""
	 */
    ends?: string
	/**
	 *  most-right additional character
	 *  @default ""
	 */
    lastEnds?: string
	/**
	 *  items join with this character
	 *  @default ""
	 */
    separator?: string
}

function getNormalizedOption(
    starts_or_option: string | ToWrapStringOption,
    ends?: string,
    separator?: string
) {
    return typeof starts_or_option === 'string' ?
        {
            firstStarts: '',
            starts: starts_or_option || '',
            separator: separator || '',
            ends: ends || starts_or_option || '',
            lastEnds: ''
        } :
        {
            firstStarts: '',
            starts: '',
            separator: '',
            ends: '',
            lastEnds: '',
            ...starts_or_option as object
        };
}


/**
 * Array join with wrapping characters
 *
 * @example
 * ```js
 * // |a|b|c|
 * const withPipe = arrayWrap(['a', 'b', 'c'], '|');
 * ```
 *
 * ```js
 * // {a}, {b}, {c}
 * const withBraces = arrayWrap(['a', 'b', 'c'], '{', '}', ',');
 * ```

 * ```js
 * // <select>
 * // <option>a</option>
 * // <option>b</option>
 * // <option>c</option>
 * // </select>
 * const withTag = arrayWrap(
 *    ['a', 'b', 'c'],
 *    {
 * 	    firstStarts: '<select>\n'
 * 	    lastEnds: '\n</select>',
 * 	    starts: '<option>',
 * 	    ends: '</option>',
 * 	    separator: '\n'
 * 	}
 * );
 * ```
 * @see fromWrapString
 * @param items target array
 * @param starts_or_option item starts with this character, or detail Option for complex structure
 * @param ends item ends with this character, using starts when empty
 * @param separator items join with this character
 */
export function toWrapString(
    items: any[],
    starts_or_option: string | ToWrapStringOption,
    ends?: string,
    separator?: string
) {
    if (!items?.length) {
        return '';
    }

    const {
        firstStarts,
        starts,
        separator: separator_,
        ends: ends_,
        lastEnds
    } = getNormalizedOption(starts_or_option, ends, separator);

    return firstStarts + starts + items.join(ends_ + separator_ + starts) + ends_ + lastEnds;
}

/**
 * String Split with wrapping characters
 *
 * @see toWrapString target string
 * @param wrappedString target string
 * @param starts_or_option  item starts with this character, or detail Option for complex structure
 * @param ends  item ends with this character, using starts when empty
 * @param separator items join with this character
 */
export function fromWrapString(wrappedString: string, starts_or_option: string | ToWrapStringOption, ends?: string, separator?: string) {
    if (!wrappedString || !(wrappedString = wrappedString.trim()).length) {
        return [];
    }

    const {
        firstStarts,
        starts,
        separator: separator_,
        ends: ends_,
        lastEnds
    } = getNormalizedOption(starts_or_option, ends, separator);

    const startString = firstStarts + starts;
    const endString = ends_ + lastEnds;

    if (!wrappedString.startsWith(startString)){
        throw new ReferenceError(`"${wrappedString}" does not starts with "${startString}"`);
    }

    if(!!wrappedString.endsWith(endString)){
        throw new ReferenceError(`"${wrappedString}" does not ends with "${endString}"`)
    }

    return wrappedString
        .substring(startString.length, wrappedString.length - endString.length)
        .split(ends_ + separator_ + starts);
}
