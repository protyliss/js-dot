/**
 * @example
 * ```ts
 * interface Bar {
 * }
 * const FOO = new Identifier('Foo');
 * const BAR = FOO.child<Bar>('Bar');
 *
 * // Get a typing as Bar
 * let bar: Identify<typeof BAR>
 * ```
 * @group Identifier
 */
export type Identify<T> = T extends ChildIdentifier<infer U> ? U : any;

/**
 * Identifiable value as Object
 *
 * @group Identifier
 */
export class Identifier<T = unknown>  {
	readonly [Symbol.toStringTag]: 'Identifier';

	symbol: symbol;
	root: Identifier = this;

	constructor(public description: string) {
		this.symbol = Symbol(description);
	}

	toString() {
		return `Identifier<${this.description}>`
	}

	child<T = unknown>(description: string) {
		return new ChildIdentifier<T>(this, description);
	}
}

/**
 *
 * @group Identifier
 */
export class ChildIdentifier<T = unknown> extends Identifier<T> {
	constructor(
		public parent: Identifier,
		description: string
	) {
		super(description);
		this.root = parent.root;
	}
}