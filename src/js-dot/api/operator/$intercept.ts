import {HttpPipe, HttpRequestInterceptCallback, HttpResponseInterceptCallback} from '@js-dot/api/http';
import {$before} from './$before';
import {$after} from './$after';

export interface HttpInterceptCallbacks {
	request: HttpRequestInterceptCallback;
	response: HttpResponseInterceptCallback;
}

/**
 * Set Http Request and Response Interceptor
 * : `HttpInterface` Pipe Operator Factory
 *
 * @see $before
 * @see $after
 */
export function $intercept<P, B, R, NP, NB, NR>(
	{request, response}: Partial<HttpInterceptCallbacks>
)
	: HttpPipe<P, B, R, P, B, R> {
	return http => {
		if (request) {
			http = http.pipe($before(request));
		}

		if (response) {
			http = http.pipe($after(response));
		}
		return http;
	}
}
