import {API_LOG} from '@js-dot/api';
import {HttpError, HttpPipe, HttpRequester, HttpResponser} from '@js-dot/api/http';
import {addSearchStringValue} from '@js-dot/core';
import {$intercept} from './$intercept';

interface HttpPolyfillCallback<P, B, R> {
	({parameters, body}?: Partial<{ parameters: P, body: B }>): HttpResponser<R>;
}

export interface HttpPolyfillOption {
	/**
	 *  Additional Search String for Identify
	 *  @default _http_=polyfill
	 */
	flag?: false | string;
	/**
	 * @default true
	 */
	cache?: boolean;

	/**
	 * Polyfill-able status code
	 * @default [400, 404, 405, 406, 500, 501]
	 */
	when?: number[]
}

const POLYFILL_FLAG = new WeakMap<HttpRequester, undefined>();

const POLYFILL_WHEN = [400, 404, 405, 406, 500, 501];

/**
 * Set Polyfill
 *  `HttpInterface` Pipe Operator Factory
 * @param callback
 * @param option
 */
export function $polyfill<P, B, R, NP, NB, NR>(callback: HttpPolyfillCallback<P, B, R>, option?: HttpPolyfillOption)
	: HttpPipe<P, B, R, P, B, R> {
	return http => {
		const {path} = http;

		const {flag, cache, when} = {

			cache: true,
			when: POLYFILL_WHEN,
			...option
		}

		if (flag) {
			http.path = addSearchStringValue(path, flag);
		}

		return http.pipe(
			$intercept({
				// todo: Not expected processing with request intercept
				// request: request => {
				// 	if (!cache || !POLYFILL_FLAG.has(http)) {
				// 		return request;
				// 	}
				//
				// 	API_LOG.debug(`[.api.$polyfill] ${'' + http} Already Failed. Using Polyfill right away.`);
				//
				// 	return callback({
				// 		parameters: request.option.parameters as P,
				// 		body: request.body
				// 	});
				// },
				response: (response) => {
					if (!(response instanceof HttpError)) {
						return response;
					}

					if (response.status && !when.includes(response.status)) {
						return response;
					}

					API_LOG.debug(`[.api.$polyfill] ${'' + http} Failed. Using Polyfill.`);

					POLYFILL_FLAG.set(http, undefined);
					const {request} = response;
					const polyfillRequest = callback({
						parameters: request.option.parameters as P,
						body: request.body
					});
					return polyfillRequest
				}
			})
		);
	}
}
