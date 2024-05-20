/**
 * Add strings to next line for looks like underline.
 *
 * @example
 * ```js
 * // "foo\n==="
 * underline('foo');
 *
 * // "bar\n---"
 * underline('bar', '-');
 * ```
 * @param headline
 * @param line
 */
export function underline(headline: string, line = '=') {
	// @ts-ignore
	return (underline = typeof window === 'object' ?
		function (headline: string, line: string) {
			return headline;
		} :
		function (headline: string, line = '=') {
			return headline + '\n' + ''.padStart(headline.length, line)
		}).apply(this, arguments);
}