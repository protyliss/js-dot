import {HttpPipe, HttpResponseInterceptCallback} from '@js-dot/api/http';

/**
 * Set Http Response Interceptor
 * : `HttpInterface` Pipe Operator Factory
 *
 * @see $intercept
 */
export function $after<P, B, R, NP, NB, NR>(
	response: HttpResponseInterceptCallback
): HttpPipe<P, B, R, P, B, R> {
	return http => {
		const {responses} = http.meta.interceptors;
		responses[responses.length] = response;

		return http;
	};
}
