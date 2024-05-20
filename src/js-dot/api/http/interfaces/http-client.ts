import {HttpMethod, HttpOption, HttpDefaultBody, HttpCredentials} from './http';
import {HttpRequest} from '../classes/http-request';
import {HttpResponse} from '../classes/http-response';
import {HttpError} from '../classes/http-error';

export interface HttpClientMeta {
}

/**
 * `HttpClient` is like a wrapping class of `fetch` as simply put.
 *
 * `fetch` required duplicate routines per each request.
 *
 * - Set credentials.
 * - Set `Content-Type` & `Accept` headers.
 * - Set request body with Converted string from JSON.
 *
 * HttpClient implementor should be made these things as easy to use.
 *
 * > Angular contains similar service class named `HttpClient`.
 */
export interface HttpClient<T = any> {
	meta: HttpClientMeta;

	credentials: HttpCredentials;

	onHostChanged(): Promise<void>;

	setHost(host: string): void;

	getHost(): string;

	getUrl(path: string): string;

	/**
	 * Request HttpRequest
	 * @param method
	 * @param url
	 * @param body
	 * @param option
	 */
	request(
		method: HttpMethod,
		url: string,
		body?: HttpDefaultBody,
		option?: Partial<HttpOption>
	): T;

	/**
	 * Request as HEAD
	 * @param path
	 * @param options
	 */
	head(path: string, options?: {})

	/**
	 * Request as GET
	 * @param path
	 * @param options
	 */
	get<RESPONSE>(path: string, options?: {})

	/**
	 * Request as POST
	 * @param path
	 * @param body
	 * @param options
	 */
	post<RESPONSE>(path: string, body?: {}, options?: {});

	/**
	 * Request as PUT
	 * @param path
	 * @param body
	 * @param options
	 */
	put<RESPONSE>(path: string, body?: {}, options?: {});

	/**
	 * Request as PATCH
	 * @param path
	 * @param body
	 * @param options
	 */
	patch<RESPONSE>(path: string, body?: {}, options?: {});

	/**
	 * Request as DELETE
	 * @param path
	 * @param options
	 */
	delete<RESPONSE>(path: string, options?: {});
}
