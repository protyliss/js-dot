import {API_LOG} from '@js-dot/api';
import {
	BodyOf,
	HttpError, HttpOption,
	HttpPipe,
	HttpRequest,
	HttpRequester,
	HttpResponse,
	ParametersOf,
	ResponseOf
} from '@js-dot/api/http';
import {objectClone, promisify} from '@js-dot/core';
import {$before} from './$before';

interface HttpMergeGroupCallback<P, B> {
	(values: { parameters: P, body: B }): any;
}

interface HttpParametersInitCallback<P, B, T> {
	(values: { parameters: P, body: B }): T;
}

export interface HttpMergeCollectArguments<P, B, T extends HttpRequester> {
	/**
	 * Parameters of Single Request
	 */
	parameters: P
	/**
	 * Body of Single Request
	 */
	body: B
	/**
	 * Parameters of Merged Request
	 */
	mergeParameters: ParametersOf<T>,
	/**
	 * Body of Merged Request
	 */
	mergeBody: BodyOf<T>,
}

export interface HttpMergeCollectReturn<T extends HttpRequester, U> {
	/**
	 * Collection ID for Extract Single Response from Merged Response
	 */
	id: U,

	/**
	 * Parameters of Merged Request
	 */
	mergeParameters?: ParametersOf<T>,

	/**
	 * Body of Merged Request
	 */
	mergeBody?: BodyOf<T>
}

export interface HttpMergeCollectCallback<P, B, T extends HttpRequester, U> {
	/**
	 * @param values
	 * @return {undefined | null} Does not Request as Merge
	 * @return Request as Merge
	 */
	(values: HttpMergeCollectArguments<P, B, T>): undefined | null | HttpMergeCollectReturn<T, U>
}


export interface HttpMergeServeCallback<R, T extends HttpRequester, U> {
	(response: ResponseOf<T>, ids: U[]): R[];
}

export interface HttpMergeOption<P, B, R, T extends HttpRequester, U> {
	/**
	 * Merging Duration
	 * @default 120
	 */
	mergeTime?: number,

	/**
	 * Delegated Requester
	 */
	requester: T,

	/**
	 * Initial Value of Delegated Requester Parameters
	 * @default {}
	 */
	parametersInit?: ParametersOf<T> | HttpParametersInitCallback<P, B, ParametersOf<T>>;

	/**
	 * Initial Value of Delegated Requester Body
	 */
	bodyInit: BodyOf<T>,

	/**
	 * Callback for make Request Group ID
	 */
	group?: HttpMergeGroupCallback<P, B>;

	/**
	 * Callback for make Response ID, Parameter and Body
	 */
	collect: HttpMergeCollectCallback<P, B, T, U>;

	/**
	 * Split Merged Response to Each Request
	 */
	serve: HttpMergeServeCallback<R, T, U>
}


interface HttpMergeStore<P, B, R, T extends HttpRequester, U> {
	origin: { parameters: P, body: B, option: HttpOption };
	option: HttpMergeOption<P, B, R, T, U>;
	http: HttpRequester;
	parameters: ParametersOf<T>;
	body: BodyOf<T>;
	executors: Array<[Function, Function, HttpRequest]>;
	groupId: any;
	ids: U[];
}

const MERGE_STORES =
		  new WeakMap<HttpRequester, WeakMap<any, HttpMergeStore<any, any, any, any, any>>>();

/**
 * Merging Multiple Requests to Single Request
 * : `HttpInterface` Pipe Operator Factory
 *
 * @description
 * REST API "1" returns a single response.
 * REST API "2" returns multiple responses as corresponds to "1"
 *
 * If "1" is requested multiple times in short time.
 * the condition of "1" is merged and request "2" then return each result to "1" requests
 *
 * ```sequence
 * Controller         -> Requester       : Request * N
 * Requester          -> $merge          : Intercept * N
 * Note over             $merge          : Set Timer for $merge.request \n Collect ID, Parameters and Bodies in delay
 * $merge             -> $merge          : $merge.collect() * N
 * $merge             -> Requester       : Return Promise * N
 * Note Over             $merge          : Timeout
 * $merge            --> $merge.requester: Request Only Once
 * $merge.requester -->> $merge          : Response Only Once
 * $merge            --> Requester       : $merge.serve() * N
 * Requester        -->> Controller      : Response * N
 * ```
 * @example
 * ```ts
 * const $multi = new FetchHttp<null, {values: Record<number, any>}, {json: {values: Record<number, any>}}>('http://httpbin.org/post');
 * const $single = new FetchHttp<null, {value: any}, {json: {value: any}}>('http://httpbin.org/post')
 *    .pipe(
 *        $merge({
 * 			requester: $multi,
 * 			bodyInit: {values: {}},
 * 			collect(({body, mergeBody}) => {
 *				const {value: id} = body;
 *
 *				// update body of $multi
 * 				mergeBody.values[id] = id;
 *
 * 				// return id of find value of $single
 * 			 	return {id};
 * 			}),
 * 			serve(response, ids) {
 * 				 // find $single response in $multi response
 *	 			 return ids.map(id => {value: response.values[id]})
 * 			})
 * 	);
 *
 * 	// 1. first request
 * 	$single.request(null, {value: 1})
 * 		.then(response => {
 * 		 	// 4. response {value: 1} from {values: {1: 1, 2: 2}}
 * 		})
 * 	// 2. second request
 * 	$single.request(null, {value: 2})
 * 		.then(response => {
 * 		 	// 5. response {value: 2} from {values: {1: 1, 2: 2}}
 * 		})
 * 	// 3. request $multi with {values: {1: 1, 2: 2}} as body
 * ```
 */

export function $merge<P, B, R, NP, NB, NR, MERGE_REQUESTER extends HttpRequester, COLLECT_ID>(
	mergeOption: HttpMergeOption<P, B, R, MERGE_REQUESTER, COLLECT_ID>
): HttpPipe<P, B, R, P, B, R> {

	const {mergeTime, parametersInit, bodyInit, group, collect, serve} = {
		mergeTime: 120,
		...mergeOption
	};
	// return http => http;
	return http => {
		return http.pipe(
			$before(request => {
				if (request.option['$merge'] === false) {
					return request;
				}

				const {option: {parameters}, body} = request;

				const groupId = group ?
					group({parameters: parameters as any, body}) || http.path :
					http.path;

				let httpStore: WeakMap<any, HttpMergeStore<P, B, R, MERGE_REQUESTER, COLLECT_ID>>;

				if (MERGE_STORES.has(http)) {
					httpStore = MERGE_STORES.get(http);
				} else {
					httpStore = new Map();
					MERGE_STORES.set(http, httpStore);
				}

				let store: HttpMergeStore<P, B, R, MERGE_REQUESTER, COLLECT_ID>;
				if (httpStore.has(groupId)) {
					store = httpStore.get(groupId);
				} else {
					store = {
						http,
						origin: {
							parameters: parameters as P,
							body,
							option: request.option
						},
						groupId,
						ids: [],
						parameters: (
							typeof parametersInit === 'function' ?
								(parametersInit as Function)({parameters, body}) :
								{...(parametersInit || {})}
						) as any,
						body: objectClone(bodyInit),
						executors: [],
						option: mergeOption
					};

					httpStore.set(groupId, store);
					setTimeout(mergedRequester, mergeTime, store);
				}

				const collected = collect({
					mergeParameters: store.parameters as any,
					mergeBody: store.body,
					parameters: parameters as any,
					body
				});

				if (!collected) {
					return request;
				}

				// console.debug('[js.api.$merge] Collect', request.url);

				const {id, mergeParameters: mergedParameters, mergeBody: mergedBody} = collected;

				store.ids[store.ids.length] = id;

				if (mergedParameters) {
					store.parameters = mergedParameters;
				}
				if (mergedBody) {
					store.body = mergedBody;
				}

				return new Promise((resolve, reject) => {
					store.executors[store.executors.length] = [resolve, reject, request];
				});
			})
		);
	};

	function mergedRequester(store: HttpMergeStore<P, B, R, MERGE_REQUESTER, COLLECT_ID>) {
		MERGE_STORES
			.get(store.http)
			.delete(store.groupId)

		// Does not have to merge request
		const {
				  origin: {option: originOption},
				  http,
				  parameters,
				  body,
				  executors,
				  option: {requester}
			  } = store;

		if (executors.length === 1) {
			// console.debug('[js.api.$merge] Origin Request');
			const {origin: {parameters, body}} = store;
			const [resolve, reject, request]   = executors[0];
			return promisify(http.request(parameters, body, {...originOption, $merge: false, $deduplicate: false}))
				.then(response => {
					resolve(new HttpResponse(request, response));
				})
				.catch(reason => {
					reject(reason);
				});
		}

		// console.debug('[js.api.$merge] Merged Request', requester.url);

		let current = executors.length;

		function rejects(reason) {
			while (current-- > 0) {
				const [resolve, reject] = executors[current];
				reject(reason);
			}
		}

		API_LOG.debug('[js.api.$merge]', http.url, store.ids);

		return promisify(requester.request(parameters, body, {$merge: false}))
			.then(response => {
				const {ids} = store;
				if (response) {
					const serveMap = serve(response, ids);
					while (current-- > 0) {
						const [resolve, reject, request] = executors[current];
						const serve                      = serveMap[current];
						if (serve === undefined) {
							reject(new HttpError(request, {
								ok: false,
								status: 404,
								statusText: 'Not Found'
							}));
						} else {
							resolve(
								new HttpResponse(request, serveMap[current])
							);
						}
					}
				} else {
					rejects('Empty Response');
				}
			})
			.catch(rejects);
	}
}
