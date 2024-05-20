import {HttpCredentials, HttpMethod, HttpOption, HttpPath} from './http';
import {HttpClient} from './http-client';
import {HttpRequest} from '../classes/http-request';
import {HttpResponse} from '../classes/http-response';
import {HttpError} from '../classes/http-error';

// @ts-ignore
import type {Observable} from 'rxjs';

export type HttpTransformType =
	| 'request'
	| 'headers'
	| 'parameters'
	| 'body';

/**
 * Http Request Interceptor
 * @description
 * - `HttpRequest` - Change the Request
 * - `HttpResponse` - Response with as Okay
 * - `HttpError` - Response with It as Error.
 * - Any other types - Response with It as Okay.
 */
export interface HttpRequestInterceptCallback {
	(request: HttpRequest):
		| HttpRequest
		| HttpResponse
		| HttpError
		| Promise<HttpRequest | HttpResponse | HttpError | any>
		| any
}

export interface HttpResponseInterceptCallback {
	(response: HttpResponse | HttpError): HttpResponse | HttpError | HttpResponser<any>;
}


export interface HttpFetchInterceptCallback {
	(response: HttpResponse): HttpResponse | HttpError;
}

export interface HttpNextInterceptCallback {
	(response: HttpResponse): any;
}

export type HttpMeta = {
	client: HttpClient;
	method: HttpMethod;
	path: string;

	transforms: {
		requests: Array<[HttpTransformType, Function]>,
		responses: Array<Function>
	},

	interceptors: {
		requests: HttpRequestInterceptCallback[],
		responses: HttpResponseInterceptCallback[],
		lastResponses: HttpResponseInterceptCallback[],
		fetch?: HttpFetchInterceptCallback;
		next?: HttpNextInterceptCallback;
	};

	followers: []
}

/**
 * Http Response Operator
 * @description
 * - `Promise` with FetchHttp
 * - rxjs `Observable` with RxHttp and NgHttp
 */
export interface HttpResponser<T>
	extends /* Ignore missed `then` message */ PromisePretender<T>, Observable<T> {
}

export interface PromisePretender<T> {
	/**
	 * @see Promise.then
	 */
	then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
}


/**
 * @template P the Parameters
 * @template B the Body
 * @template R the Response
 */
export interface HttpRequester<P = any, B = any, R = any,
	// E = P extends null ? null : keyof P,
	// ER = R
	> {
	/**
	 * Http Method
	 */
	method: string;

	/**
	 * Http Path
	 */
	path: string;

	/**
	 * Http URL
	 */
	url: string;

	/**
	 * @default same-origin
	 */
	credentials: HttpCredentials;

	meta: HttpMeta;

	_polyfillCallback: any;

	_parameters: Partial<P>;

	_preloadApis: Array<[HttpRequester, any?]>;

	//////////////////////////////
	// HTTP METHODS

	/**
	 * Create <GET> HTTP API
	 * @param path
	 * @param option
	 */
	// get<CHILD_PARAMETERS, CHILD_RESPONSE>(path?: string, option?: Partial<HttpOption>)
	// 	// : HttpPromise<HttpPath<P, CHILD_PARAMETERS>, null, CHILD_RESPONSE>
	// : HttpOperator<HttpPath<P, CHILD_PARAMETERS>, null, CHILD_RESPONSE>

	get<CHILD_PARAMETERS, CHILD_RESPONSE = any>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, never, CHILD_RESPONSE>

	/**
	 * Create <POST> HTTP API
	 * @param path
	 * @param option
	 */
	post<CHILD_PARAMETERS, CHILD_BODY, CHILD_RESPONSE = any>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, CHILD_BODY, CHILD_RESPONSE>;

	/**
	 * Create <PUT> HTTP API
	 * @param path
	 * @param option
	 */
	put<CHILD_PARAMETERS, CHILD_BODY, CHILD_RESPONSE = any>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, CHILD_BODY, CHILD_RESPONSE>;

	/**
	 * Create <PATCH> HTTP API
	 * @param path
	 * @param option
	 */
	patch<CHILD_PARAMETERS, CHILD_BODY, CHILD_RESPONSE = any>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, CHILD_BODY, CHILD_RESPONSE>;

	/**
	 * Create <DELETE> HTTP API
	 * @param path
	 * @param option
	 */
	delete<CHILD_PARAMETERS, CHILD_RESPONSE = undefined>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, null, CHILD_RESPONSE>;

	//////////////////////////////

	/**
	 * Get Url from dynamic parameters
	 * @param parameters
	 */
	url2(parameters: P): string;

	// set(property: string, value: any): this;

	/**
	 * Request Http Response
	 * @example
	 * ```js
	 * const requester = new FetchHttp('http://host/:path?:search');
	 * requester
	 * 	.request(
	 * 		{
	 * 	    	path: 'path-value',
	 *	 	    $search: 'search-string-value'
	 * 		}
	 * 	)
	 * 	.then(response => {
	 * 	  console.log(response)
	 * 	});
	 * ```
	 * @param parameters request path and search string parameter value, search string name starts with `$`
	 * @param body request body
	 * @param option
	 */
	// request<T extends P, U = R>(parameters: T, body?: B)
	// 	: T extends E ? Promise<ER> : Promise<R>;
	request(parameters: P, body?: B, option?: Partial<HttpOption>): HttpResponser<R>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param a
	 */
	// pipe<NP, NB, NR, NE, NER>(
	// 	a: HttpPipe<P, B, R, NP, NB, NR, NE, NER>
	// ): HttpOperator<NP, NB, NR, NE, NER>;

	pipe<NP, NB, NR>(
		a: HttpPipe<P, B, R, NP, NB, NR>
	): HttpRequester<NP, NB, NR>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param a
	 * @param b
	 */
	pipe<AP, AB, AR, NP, NB, NR>(
		a: HttpPipe<P, B, R, AP, AB, AR>,
		b: HttpPipe<AP, AB, AR, NP, NB, NR>
	): HttpRequester<NP, NB, NR>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param a
	 * @param b
	 * @param c
	 */
	pipe<AP, AB, AR, BP, BB, BR, BA, NP, NB, NR>(
		a: HttpPipe<P, B, R, AP, AB, AR>,
		b: HttpPipe<AP, AB, AR, BP, BB, BR>,
		c: HttpPipe<BP, BB, BR, NP, NB, NR>
	): HttpRequester<NP, NB, NR>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param a
	 * @param b
	 * @param c
	 * @param d
	 */
	pipe<AP, AB, AR, BP, BB, BR, BA, CP, CB, CR, NP, NB, NR>(
		a: HttpPipe<P, B, R, AP, AB, AR>,
		b: HttpPipe<AP, AB, AR, BP, BB, BR>,
		c: HttpPipe<BP, BB, BR, CP, CB, CR>,
		d: HttpPipe<CP, CB, CR, NP, NB, NR>
	): HttpRequester<NP, NB, NR>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param a
	 * @param b
	 * @param c
	 * @param d
	 * @param e
	 */
	pipe<AP, AB, AR, BP, BB, BR, BA, CP, CB, CR, DP, DB, DR, NP, NB, NR>(
		a: HttpPipe<P, B, R, AP, AB, AR>,
		b: HttpPipe<AP, AB, AR, BP, BB, BR>,
		c: HttpPipe<BP, BB, BR, CP, CB, CR>,
		d: HttpPipe<CP, CB, CR, DP, DB, DR>,
		e: HttpPipe<DP, DB, DR, NP, NB, NR>
	): HttpRequester<NP, NB, NR>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param a
	 * @param b
	 * @param c
	 * @param d
	 * @param e
	 * @param f
	 */
	pipe<AP, AB, AR, BP, BB, BR, BA, CP, CB, CR, DP, DB, DR, EP, EB, ER, NP, NB, NR>(
		a: HttpPipe<P, B, R, AP, AB, AR>,
		b: HttpPipe<AP, AB, AR, BP, BB, BR>,
		c: HttpPipe<BP, BB, BR, CP, CB, CR>,
		d: HttpPipe<CP, CB, CR, DP, DB, DR>,
		e: HttpPipe<DP, DB, DR, EP, EB, ER>,
		f: HttpPipe<EP, EB, ER, NP, NB, NR>
	): HttpRequester<NP, NB, NR>;

	/**
	 * Polyfill the Pipe Operator `|>` of Future Specification
	 * @param pipeOperators
	 */
	pipe(...pipeOperators: any[]): this;
}

export interface HttpRequesterConstructor {
	new(...args: any[]): HttpRequester;
}


export interface HttpPipe<P, B, R, NP = P, NB = B, NR = R, NE = never, NER = never> {
//	(http: HttpOperator<P, B, R>): HttpOperator<NP, NB, NR, NE, NER>;
	(http: HttpRequester<P, B, R>): HttpRequester<NP, NB, NR>;
}

export interface HttpResponseTransformCallback<P, B, R, NP = P, NB = B, NR = R> {
	/**
	 *
	 * @param response Origin Response
	 * @param otherStates Request Parameters and Body
	 */
	(response: R, {parameters, body}?: {
		/**
		 * Request Parameters
		 */
		parameters: P,
		/**
		 * Request Body
		 */
		body: B
	}): NR;
}

/**
 * Get Request Parameters Type from HttpRequester
 */
export type ParametersOf<T extends HttpRequester> = T extends HttpRequester<infer P> ? P : any;
/**
 * Get Request Body Type from HttpRequester
 */
export type BodyOf<T extends HttpRequester> = T extends HttpRequester<any, infer B> ? B : any;
/**
 * Get Response Body Type from HttpRequester
 */
export type ResponseOf<T extends HttpRequester> = T extends HttpRequester<any, any, infer R> ? R : any;
