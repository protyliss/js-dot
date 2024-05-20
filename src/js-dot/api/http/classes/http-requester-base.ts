import {parseUrl, promisify, toCamelCase, toKebabCase, toSnakeCase} from '@js-dot/core';
import {setTemplateUrl} from '../functions/set-template-url';
import {HttpCredentials, HttpHeadersInit, HttpMethod, HttpOption, HttpPath} from '../interfaces/http';
import {HttpClient} from '../interfaces/http-client';
import {HttpMeta, HttpRequester, HttpRequesterConstructor, HttpResponser} from '../interfaces/http-requester';
import {$deduplicate_requestInterceptor, $deduplicate_responseInterceptor} from './$deduplicate';
import {HttpError} from './http-error';
import {HttpHeaders} from './http-headers';
import {HttpRequest} from './http-request';
import {HttpResponse} from './http-response';

// let INDEX = 0;

export abstract class HttpRequesterBase<P = any, B = any, R = any>
	implements HttpRequester<P, B, R> {
	//////////////////////////////
	// Inherit
	meta!: HttpMeta;

	//////////////////////////////
	// Un-inherit
	credentials!: HttpCredentials;
	_polyfillCallback = null;
	_parameters       = {}
	_preloadApis      = [];
	_option: Partial<HttpOption>;

	get method() {
		return this.meta.method;
	}

	get path() {
		return this.meta.path;
	}

	set path(path: string) {
		this.meta.path = path;
	}

	get url() {
		return this.meta.client.getUrl(this.meta.path);
	}

	constructor(client: HttpClient, method?: HttpMethod, path?: string);
	constructor(method: HttpMethod, path?: string, option?: Partial<HttpOption>);
	constructor(path: string, option?: Partial<HttpOption>);
	constructor(
		client_or_path_or_method: HttpClient | HttpMethod | string = '',
		method_or_path_or_option?: string | Partial<HttpOption> | HttpMethod,
		path_or_option?: string | Partial<HttpOption>
	) {
		let client: HttpClient<any>;
		let path: string;
		let method: HttpMethod
		let option: Partial<HttpOption> = {};

		if (typeof client_or_path_or_method !== 'string') {
			client = client_or_path_or_method as HttpClient;
			method = method_or_path_or_option as HttpMethod || 'GET';
			path   = path_or_option as string || '';
		} else {
			switch (arguments.length) {
				case 1:
					path = client_or_path_or_method as string;
					break;
				case 2:
					if (typeof method_or_path_or_option === 'string') {
						method = client_or_path_or_method as HttpMethod;
						path   = method_or_path_or_option
					} else {
						path           = client_or_path_or_method as string;
						path_or_option = method_or_path_or_option as Partial<HttpOption>;
					}
					break;
				case 3:
					method = client_or_path_or_method as HttpMethod
					path   = method_or_path_or_option as string
					option = path_or_option as Partial<HttpOption>;
			}
		}

		const meta = Object.assign(
			{
				method: 'GET',
				path: '/',
				transforms: {
					requests: [],
					responses: []
				},
				interceptors: {
					requests: [$deduplicate_requestInterceptor],
					responses: [],
					lastResponses: [$deduplicate_responseInterceptor]
				}
			},

			{
				// @ts-ignore
				client,
				// @ts-ignore
				method,
				// @ts-ignore
				path
			}
		) as HttpMeta;

		if (!meta.client) {
			const clientClass = this._getHttpClient();

			// @ts-ignore
			if (!clientClass['_instance_']) {
				// @ts-ignore
				clientClass['_instance_'] = new clientClass();
			}

			meta.client = new clientClass();
		}

		this.meta    = meta;
		this._option = option;
	}

	/**
	 * Get Default Requester Client Class
	 * Return it-self.
	 * @description
	 * If Requester Extended it-self for make collection of requester, Occurred maximum call stack.
	 */
	abstract _getHttpRequester(): HttpRequesterConstructor;

	/**
	 * Get Default Client Class
	 */
	abstract _getHttpClient(): new(...args: any[]) => HttpClient;

	/**
	 * @inheritDoc
	 */
	get<CHILD_PARAMETERS, CHILD_RESPONSE>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, null, CHILD_RESPONSE> {
		return (
			new (this._getHttpRequester())(
				this.meta.client,
				'GET',
				addPath(this.path, path),
				option
			)
		)
		// .pipe(
		// 	$singleton()
		// )
	}

	/**
	 * @inheritDoc
	 */
	post<CHILD_PARAMETERS, CHILD_BODY, CHILD_RESPONSE = any>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, CHILD_BODY, CHILD_RESPONSE> {
		return new (this._getHttpRequester())(this.meta.client, 'POST', addPath(this.path, path), option) as any;
	}

	/**
	 * @inheritDoc
	 */
	put<CHILD_PARAMETERS, CHILD_BODY, CHILD_RESPONSE>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, CHILD_BODY, CHILD_RESPONSE> {
		return new (this._getHttpRequester())(this.meta.client, 'PUT', addPath(this.path, path), option) as any;
	}

	/**
	 * @inheritDoc
	 */
	patch<CHILD_PARAMETERS, CHILD_BODY, CHILD_RESPONSE>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, CHILD_BODY, CHILD_RESPONSE> {
		return new (this._getHttpRequester())(this.meta.client, 'PATCH', addPath(this.path, path), option) as any;
	}

	/**
	 * @inheritDoc
	 */
	delete<CHILD_PARAMETERS, CHILD_RESPONSE>(path?: string, option?: Partial<HttpOption>)
		: HttpRequester<HttpPath<P, CHILD_PARAMETERS>, null, CHILD_RESPONSE> {
		return new (this.constructor as any)(this.meta.client, 'DELETE', addPath(this.path, path), option);
	}

	url2(parameters: P){
		return this.meta.client.getUrl(
			setTemplateUrl(this.meta.path, parameters)
		);
	}

	request(parameters?: P, body?: B, option: Partial<HttpOption> = {}): HttpResponser<R> {

		if (!parameters) {
			// Prevent Piping Reference Error
			parameters = {} as P;
		}

		const defaultOption   = {...this._option};
		defaultOption.headers = getHeaderValues(defaultOption.headers);
		option.headers        = getHeaderValues((option as any).headers);

		const formalizedOption = {
			...defaultOption,
			...option
		};

		const {
				  meta: {
					  client,
					  method,
					  transforms: {
						  requests: requestTransformers
					  },
					  interceptors: {
						  requests: requestInterceptors
					  }
				  }
			  } = this;

		let end     = requestTransformers.length;
		let current = -1;

		const headersClone = {...option.headers};

		while (++current < end) {
			const [transformType, transformCallback] = requestTransformers[current];
			switch (transformType) {
				case 'request':
					const transformed = transformCallback({headers: headersClone, parameters, body})
					if (transformed.hasOwnProperty('headers')) {
						option.headers = getHeaderValues(transformed.headers);
					}
					if (transformed.hasOwnProperty('parameters')) {
						parameters = transformed.parameters;
					}
					if (transformed.hasOwnProperty('body')) {
						body = transformed.body;
					}
					break;
				case 'parameters':
					parameters = transformCallback(parameters, {headers: headersClone, body})
					break;
				case 'body':
					body = transformCallback(body, {headers: headersClone, parameters})
					break;
			}
		}

		// parameter case 추가
		const caseAs = option.hasOwnProperty('caseAs') ?
			option.caseAs :
			'kebab-case';

		const casing = {
			'kebab-case': toKebabCase,
			'camelCase': toCamelCase,
			'snake_case': toSnakeCase
		}[caseAs];

		// todo: use url method
		// todo: Add Option
		for (let key in parameters) {
			if (parameters.hasOwnProperty(key) && key.startsWith('$')) {
				// const kebabCasedKey = toKebabCase(key);
				// if (kebabCasedKey !== key) {
				// 	parameters[kebabCasedKey] = parameters[key];
				// 	delete parameters[key];
				// }
				const casedKey = casing(key);
				if (casedKey !== key) {
					parameters[casedKey] = parameters[key];
					delete parameters[key];
				}
			}
		}

		option.parameters = parameters;

		const url = client.getUrl(
			setTemplateUrl(this.meta.path, parameters)
		);

		if(url.includes('/labels')){
			console.error(
				method,
				url,
				body as any,
				option
			);
		}

		let request = client.request(
			method,
			url,
			body as any,
			option
		);

		//////////////////////////////
		// Request Intercept
		//////////////////////////////

		end = requestInterceptors.length;
		if (end) {
			let current = -1;
			while (++current < end) {
				const requestInterceptor = requestInterceptors[current];
				const result             = requestInterceptor(request);

				if (request === result) {
					continue;
				}

				if (result instanceof HttpRequest) {
					// console.debug(`[js.api] ${method} ${url} Intercept as Request`);
					request = result;
					continue;
				}

				if (result instanceof HttpResponse) {
					url.includes('/labels') && console.debug(`[js.api] ${method} ${url} Intercept as Response`);
					request.response = result;
					return request.next(promisify(this._responseIntercept(request)));
				}

				if (result instanceof HttpError) {
					url.includes('/labels') && console.debug(`[js.api] ${method} ${url} Intercept as Error`);
					return request.reject(result);
				}

				if (result instanceof Promise) {
					// let index = ++INDEX;
					// console.debug(`[js.api] ${method} ${url} Intercept as Promise`, index);
					return request.next(
						result
							.then(result_ => {
								request.response = result_;
								return promisify(this._responseIntercept(request));
							})
							.catch(reason => {
								request.response = new HttpError(request, reason);
								return promisify(this._responseIntercept(request));
							})
					);
				}

				// console.debug(`[js.api] ${method} ${url} resolve`);
				return request.resolve(result);
			}
		}

		// console.debug(`[js.api] ${method} ${url} execute`);
		return this._execute(request, parameters, body, formalizedOption);
	}

	// abstract _execute(parameters?: P, body?: B, option?: Partial<HttpOption>);
	abstract _execute(request, parameters?: P, body?: B, option?: Partial<HttpOption>);

	protected _responseIntercept(request) {
		const {
				  meta: {
					  transforms: {
						  responses: responseTransformers
					  },
					  interceptors: {
						  responses: responseInterceptors,
						  lastResponses: lastResponseInterceptors
					  }
				  }
			  } = this;

		const allResponseInterceptors = [...responseInterceptors, ...lastResponseInterceptors];
		const responseInterceptorEnd  = allResponseInterceptors.length;


		let current = -1;
		while (++current < responseInterceptorEnd) {
			const newResponse: HttpResponse | HttpError | any = allResponseInterceptors[current](request.response);
			if (newResponse === request.response) {
				// console.debug('Response Interceptor as Same Response');
				continue;
			}

			if (newResponse instanceof HttpResponse) {
				// console.debug('Response Interceptor as HttpResponse');
				request.response = newResponse;
				continue;
			}

			if (newResponse instanceof HttpError) {
				// console.debug('Response Interceptor as HttpError');
				return request.reject(newResponse);
			}
		}
		// console.debug(`Response Next`);
		return request.next(request.response);
	}

	pipe(...pipeOperators: any[]) {
		const end   = pipeOperators.length;
		let current = -1;
		let result  = this;

		while (++current < end) {
			const pipeOperator = pipeOperators[current];
			result             = pipeOperator(result);
		}

		return result as any;
	}

	toString() {
		return `${this.method} ${this.path}`;
	}
}

const {isArray: IS_ARRAY}         = Array;
const {fromEntries: FROM_ENTRIES} = Object;

export function getHeaderValues(headers: HttpHeaders | HttpHeadersInit | HeadersInit) {
	return headers instanceof HttpHeaders ?
		headers.values :
		IS_ARRAY(headers) ?
			FROM_ENTRIES(headers) :
			headers || {};
}

//
// function $singleton<P, B, R>(): HttpPipe<P, B, R> {
// 	const REQUESTS = {};
// 	return http => {
// 		const {meta: {interceptors: {requests, responses}}} = http;
//
// 		requests[requests.length] = (request) => {
// 			const {url}     = request;
// 			const requested = REQUESTS[url];
// 			if (requested) {
// 				// return new Promise((resolve, reject) => {
// 				// 	requested.executors.push([resolve, reject]);
// 				// })
// 				return requested.origin['fetcher'];
// 			}else{
// 				REQUESTS[url] = {
// 					// executors: []
// 					origin: request
// 				};
// 			}
//
// 			return request;
// 		}
//
// 		responses[responses.length] = (response) => {
// 			const {url}     = response;
// 			const requested = REQUESTS[url];
//
// 			if (requested) {
// 				console.warn(url, response);
// 				const {executors} = requested;
//
// 				let current = executors.length;
// 				if (current) {
// 					console.warn(`[js.api] Requested ${url} for ${current + 1} times in same time`);
// 					while (current-- > 0) {
// 						executors[current][0](response);
// 					}
// 				}
//
// 				delete REQUESTS[url];
// 			}
//
// 			return response;
// 		}
//
// 		return http;
// 	}
// }

function addPath(before: string, after: string) {
	if (before) {
		if (after) {
			const {protocol, host, pathname, search, hash} = parseUrl(before);
			return (host ? `${protocol}//${host}` : '')
				+ (
					pathname ?
						pathname.endsWith('/') && after.startsWith('/') ?
							pathname + after.slice(1) :
							pathname + after :
						after.startsWith('/') ?
							after :
							'/' + after
				)
				+ (search || '')
				+ (hash || '')
		}
		return before;
	}
	return after;
}
