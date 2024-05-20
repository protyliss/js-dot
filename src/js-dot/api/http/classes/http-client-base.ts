import {HttpCredentials, HttpDefaultBody, HttpOption} from '../interfaces/http';
import {HttpClient, HttpClientMeta} from '../interfaces/http-client';


/**
 * Base Implementor of `HttpClient`
 * @inheritDoc
 */
export abstract class HttpClientBase<T> implements HttpClient<T> {
	protected _host                              = '';
	protected _firstSetHostResolvers: Function[] = [];

	meta: HttpClientMeta = {
		interceptors: {
			requests: [],
			responses: []
		}
	};

	credentials: HttpCredentials = 'same-origin';


	constructor(host?: string) {
		if (host) {
			this.setHost(host);
		}
	}

	onHostChanged(): Promise<void> {
		const {_firstSetHostResolvers} = this;
		return _firstSetHostResolvers ?
			new Promise(resolve => {
				_firstSetHostResolvers[_firstSetHostResolvers.length] = resolve;
			}) :
			Promise.resolve();
	}

	setHost(host: string) {
		this._host = host;

		const {_firstSetHostResolvers} = this;
		if (_firstSetHostResolvers) {
			let current = _firstSetHostResolvers.length;
			while (current-- > 0) {
				_firstSetHostResolvers[current]();
			}
			this._firstSetHostResolvers = null;
		}
	}

	getHost() {
		return this._host;
	}

	getUrl(path: string) {
		return path.indexOf('://') > -1 ?
			path :
			this._host + path;
	}

	/**
	 * Request
	 * @param method
	 * @param url
	 * @param body
	 * @param option
	 */

	request(method: string, url: string, body?: HttpDefaultBody, option?: Partial<HttpOption>) {
		return this._execute(method, url, body, option);
	}


	abstract _execute(method: string, url: string, body?: HttpDefaultBody, option?: Partial<HttpOption>): T;


	/**
	 * Request <GET>
	 * @param url
	 * @param option
	 */
	head(url: string, option?: HttpOption) {
		return this.request('head', url, null, option);
	}

	/**
	 * Request <GET>
	 * @param url
	 * @param option
	 */
	get<R>(url: string, option?: HttpOption) {
		return this.request('get', url, null, option);
	}

	/**
	 * Request <PATCH>
	 * @param url
	 * @param body
	 * @param option
	 */
	patch<R>(url: string, body?: {}, option?: HttpOption) {
		return this.request('patch', url, body, option)
	}

	/**
	 * Request <POST>
	 * @param url
	 * @param body
	 * @param option
	 */
	post<R>(url: string, body?: {}, option?: HttpOption) {
		return this.request('post', url, body, option);
	}

	/**
	 * Request <PUT>
	 * @param url
	 * @param body
	 * @param option
	 */
	put<R>(url: string, body?: {}, option?: HttpOption) {
		return this.request('put', url, body, option);
	}

	/**
	 * Request <DELETE>
	 * @param url
	 * @param option
	 */
	delete<R>(url: string, option?: HttpOption) {
		return this.request('delete', url, null, option);
	}
}
