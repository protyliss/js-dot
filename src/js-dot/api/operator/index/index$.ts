import {HttpPipe} from '@js-dot/api/http';

/**
 * Get Response from IndexedDB
 */
export function index$<P, B, R, NP, NB, NR>(): HttpPipe<P, B, R> {
	return api => {
		return api;
	}
}
