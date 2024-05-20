export interface Destroyable {
	/**
	 * The `destroy()` method of Destroyable instances some routine for deconstruct-things to this instance.
	 */
	destroy(): void | Promise<void>
}