import {HttpPipe} from '@js-dot/api/http';

export interface HttpRequestTransformCallback<P, B, R, NP, NB, NR> {
	(states: {
		/**
		 * Request Headers
		 */
		headers: Record<string, string>,
		/**
		 * Request Parameters
		 */
		parameters: P,
		/**
		 * Request Body
		 */
		body: B
	}): Partial<{
		/**
		 * Transformed Request Headers
		 */
		headers: Record<string, string>
		/**
		 * Transformed Request Parameters
		 */
		parameters: NP,
		/**
		 * Transformed Request Body
		 */
		body: NB
	}>;
}

/**
 * Transform Request Parameters and Body
 * : `HttpRequester` Pipe Operator Factory
 *
 * @description
 * ```js
 * const http = (new FetchHttp('GET', 'https://httpbin.org/get?type'))
 * 	.pipe($request({parameters, body} => {
 * 		// Update Request Values
 *
 * 		if(Array.isArray(body)){
 * 			parameters.$type = 'array';
 * 		}else if(typeof body === 'boolean'){
 * 		 	parameters.$type = 'boolean';
 * 		}else{
 * 			parameters.$type = 'other';
 * 		}
 * 		return {parameters, body}
 * 	});
 * ```
 * @param callback
 */
export function $request<P, B, R, NP, NB, NR>(
	callback: HttpRequestTransformCallback<P, B, R, NP, NB, NR>)
	: HttpPipe<P, B, R, P, B, R> {

	return http => {
		const {requests} = http.meta.transforms;
		requests[requests.length] = ['request', callback];

		return http;
	};
}
