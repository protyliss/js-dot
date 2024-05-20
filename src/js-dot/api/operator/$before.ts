import {HttpPipe, HttpRequestInterceptCallback} from '@js-dot/api/http';
import {$intercept} from './$intercept';

/**
 * Set Http Request Interceptor
 * : `HttpInterface` Pipe Operator Factory
 *
 * @see $intercept
 */
export function $before<P, B, R, NP, NB, NR>(
	request: HttpRequestInterceptCallback
): HttpPipe<P, B, R, P, B, R> {
	return http => {
		const {requests} = http.meta.interceptors;
		requests[requests.length] = request;

		return http;
	};
}
