/**
 * Style Declaration-able Type
 *
 * Before:
 *
 * - `a:1;b:2;`
 * - `{a: 1, b: 2}`
 * - `[['a', 1], ['b', 2]]`
 *
 * After:
 * `a:1;b:2;`
 */
export type StyleDeclareLike =
	| string
	| Record<string, any>
	| Array<[string, any]>

/**
 * @deprecated Use StyleDeclareLike instead.
 */
export type UsvObject = StyleDeclareLike;