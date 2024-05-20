export interface DynamicComposeOption {
	write?: boolean;
	/**
	 * Throttling time for run at once per in duration of it.
	 * If having debounce together, ignoring debounce.
	 * @default undefined
	 */
	throttle?: number;
	/**
	 * Debouncing time for run at after last request for once.
	 * If having throttle together, ignoring debounce
	 */
	debounce?: number;
}