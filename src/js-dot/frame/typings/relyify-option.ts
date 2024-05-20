/**
 * relyify() options
 *
 * @group rely-ify
 */
export interface RelyifyOption {
	/**
	 * Reliable token
	 */
	token: any,
	/**
	 * Rely on a callback returns
	 */
	factory?: () => any
	/**
	 * Rely on a class instance.
	 */
	class?: any;
	/**
	 * Rely on to static value
	 */
	value?: any;
	/**
	 * Rely on as not a singleton.
	 */
	multiple?: boolean;

	/**
	 * Override token when it already rely-ify-ed.
	 * @default false
	 */
	override?: boolean;
}