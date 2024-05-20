import {HttpMeta, HttpRequester, HttpRequesterConstructor} from '../interfaces/http-requester';
import {HttpClient} from '../interfaces/http-client';
import {HttpDefaultParameters, HttpMethod} from '../interfaces/http';

/**
 * Base of Http Requester Collection Class with Dynamic HttpRequester and HttpClient
 *
 * @example setup
 * ```js
 * class UserApis extends DynamicHttpBase {
 *     httpRootPath = 'http://localhost/api/users';
 *     $get = this.httpRoot.get();
 * }
 * ```
 *
 * @example UserApis with FetchHttp
 * ```js
 * class FetchUserApis extends UserApis {
 *     constructor(){
 *         super(FetchHttp)
 *     }
 * }
 * ```
 *
 * @example UserApis with RxHttp, FetchHttpClient
 *
 * ```js
 * class FetchUserApis extends UserApis {
 *     constructor(){
 *         super(RxHttp, new FetchHttpClient)
 *     }
 * }
 * ```
 */
export abstract class DynamicHttpBase {
	protected _httpRoot: HttpRootRequester;
	protected _httpRequestConstructor: HttpRequesterConstructor;

	/**
	 * Default Http Root Path
	 * @protected
	 */
	protected httpRootPath!: string;

	/**
	 * Http Root Requester
	 */
	get httpRoot() {
		return this._httpRoot
			|| (this._httpRoot = this.httpClient ?
					new (this._httpRequestConstructor)(this.httpClient, 'GET', this.httpRootPath) :
					new (this._httpRequestConstructor)(this.httpRootPath)
			);
	}

	constructor(
		protected httpRequesterConstructor: HttpRequesterConstructor,
		public httpClient?: HttpClient
	) {
		this._httpRequestConstructor = httpRequesterConstructor;
		this.httpClient              = httpClient;
	}

	// protected httpRequester(method: HttpMethod): HttpRequester
	// protected httpRequester(client: HttpClient, method: HttpMethod, path: string): HttpRequester
	// protected httpRequester(client_or_path: HttpClient | string, method?: HttpMethod, path?: string){
	// 	return this._httpClient ?
	// 		new (this._httpRequestConstructor)(this._httpClient, method, path) :
	// 		new (this._httpRequestConstructor)(path);
	// }
}

export type HttpRootRequester<P = any> = Omit<HttpRequester<P>, 'request'>;
