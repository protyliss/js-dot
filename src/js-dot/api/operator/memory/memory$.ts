import {API_LOG} from '@js-dot/api';
import {HttpPipe, HttpRequest, HttpResponse} from '@js-dot/api/http';
import {$intercept} from '../$intercept';
import {API_MEMORIES, defaultMemoryId} from './memory';

export interface ApiGetMemoryOption {
	/**
	 * Caching Expires Time
	 *
	 * @description
	 * - `0`: disable memory
	 * - over `0`: Keep memory until seconds.
	 * @default 60
	 */
	expires: number;

	/**
	 * Cache ID as Static
	 * @default undefined
	 */
	id: string,

	/**
	 * Cache ID Generate Function
	 * @default (request) => request.url
	 * @param request
	 */
	getId(request: HttpRequest): string;
}

/**
 * Get Response from Memory
 * @example
 * Caching Response by URL:
 *
 * ```js
 * const http = (new FetchHttp('GET', 'http://httpbin.org/get'))
 * 	.pipe(memory$());
 *
 * 	// get response from http request
 * 	http.request(null).then();
 *
 * 	// get response from memory after below http request
 * 	http.request(null).then();
 * ```
 * @param option
 */
export function memory$<P, B, R, NP, NB, NR>(option?: Partial<ApiGetMemoryOption>): HttpPipe<P, B, R, P, B, R> {
	option = Object.assign({
		expires: 60,
		getId: defaultMemoryId
	}, option || {});


	const {id: staticId, getId, expires} = option;
	const expiresTime                    = expires ? expires * 1000 : undefined;


	return http => {
		return expiresTime ? http.pipe(
				$intercept({
					request: memory$_requestInterceptor,
					response: memory$_responseInterceptor
				})
			) as any :
			http;
	};


	/**
	 * @param request
	 */
	function memory$_requestInterceptor(request: HttpRequest) {
		if (request instanceof HttpRequest && request.option['cache'] !== false) {
			const id = staticId || getId(request);

			if (!id || !API_MEMORIES.hasOwnProperty(id)) {
				return request;
			}

			const [cachedAt, response] = API_MEMORIES[id];

			if (!cachedAt || cachedAt > Date.now()) {
				API_LOG.debug('[js.api.memory$] Using Memory ID', id);
				return response;
			} else {
				API_LOG.debug('[js.api.memory$] Expired ID', id);
				delete API_MEMORIES[id];
			}
		}

		return request;
	}

	function memory$_responseInterceptor(response: HttpResponse) {
		if (response instanceof HttpResponse && response.ok && response.request.option['cache'] !== false) {
			const {request} = response;
			const id        = staticId || getId(request);
			if (id && response.ok && !API_MEMORIES.hasOwnProperty(id)) {
				API_LOG.debug('[js.api.memory$] Set', id);
				API_MEMORIES[id] = [expires ? Date.now() + expiresTime : null, response];
			}
		}

		return response;
	}
}
