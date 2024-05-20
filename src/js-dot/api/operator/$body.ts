import {HttpPipe} from '@js-dot/api/http';

export interface HttpBodyTransformCallback<P, B, R, NP, NB, NR> {
	/**
	 *
	 * @param body Request Body
	 * @param otherStates Request Headers and Parameters
	 */
	(body: B, otherStates?: {
		/**
		 * Request Headers
		 */
		headers: Record<string, string>,

		/**
		 * Request Body
		 */
		parameters: P
	}): NB;
}

/**
 * Transform the Request Body
 * : `HttpRequester` Pipe Operator Factory
 * : Simplified of `$request` for body
 *
 * @description
 * ```js
 * const http = (new FetchHttp('GET', 'https://httpbin.org/get'))
 * 	.pipe($body(body => {
 * 		// Update Body
 *  	body['transformed'] = true;
 * 		return body;
 * 	});
 * ```
 * @param callback
 */
export function $body<P, B, R, NP, NB, NR>(
	callback: HttpBodyTransformCallback<P, B, R, NP, NB, NR>)
	: HttpPipe<P, B, R, P, B, R> {

	return http => {
		const {requests} = http.meta.transforms;
		requests[requests.length] = ['body', callback];

		return http;
	}
}
