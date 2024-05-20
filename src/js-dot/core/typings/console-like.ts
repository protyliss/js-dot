/**
 *  Another Implementation of Console
 */
export type ConsoleLike = {
	[K in keyof Console]: Console[K] extends Function ? Console[K] : never;
}

/**
 * Pick method of Console-like
 */
export type PickConsoleLike<TMethod extends keyof Console> = {
	[K in TMethod]: Console[K];
}

/**
 * Minimal Implementation of Console-like
 *
 * Includes :
 * - console.log()
 * - console.debug()
 * - console.info()
 * - console.warn()
 * - console.error()
 */
export type MiniConsole = PickConsoleLike<'log' | 'debug' | 'info' | 'warn' | 'error'>;