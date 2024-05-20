import {HttpPipe} from '@js-dot/api/http';

export interface HttpParameterTransformCallback<P, B, R, NP, NB, NR> {
	/**
	 *
	 * @param parameters Request Parameters
	 * @param otherStates Request Headers and Body
	 */
	(parameters: P, otherStates?: {
		/**
		 * Request Headers
		 */
		headers: Record<string, string>,

		/**
		 * Request Body
		 */
		body: B
	}): NP;
}

/**
 * Transform the Request Parameters
 * : `HttpRequester` Pipe Operator Factory
 * : Simplified of `$request` for parameters
 *
 * @description
 * ```js
 * const http = (new FetchHttp('GET', 'https://httpbin.org/get?page'))
 * 	.pipe($parameters(parameters => {
 * 		// Update Parameters
 *  	if(parameters.$page && parameters.$page < 1>){
 *  	    parameters.$page = 1;
 *  	}
 * 		return body;
 * 	});
 * ```
 * @param callback
 */
export function $parameters<P, B, R, NP, NB, NR>(
	callback: HttpParameterTransformCallback<P, B, R, NP, NB, NR>)
	: HttpPipe<P, B, R, P, B, R> {

	return http => {

		const {requests} = http.meta.transforms;
		requests[requests.length] = ['parameters', callback];

		return http;
	};
}
