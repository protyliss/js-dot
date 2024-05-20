import {ObservablePretender} from '@js-dot/core';
import {HttpMethod, HttpOption} from '../interfaces/http';
import {HttpError} from './http-error';
import {HttpResponse} from './http-response';

/**
 * Default of Http Request
 */
export abstract class HttpRequest<RESPONSE = any, ORIGIN_RESPONSE = HttpResponse | HttpError> {
	response: HttpResponse;
	option: HttpOption;
	path: string;
	constructor(
		public method: HttpMethod,
		public url: string,
		public body: any,
		option: Partial<HttpOption>
	) {
		this.option = option as HttpOption;
		this.path = url.split('/').slice(4).join('/');
	}

	abstract fetch(): PromiseLike<any> | ObservablePretender<any>;

	next(response: ORIGIN_RESPONSE) {
		// console.warn('next', response);
		 return this.dispatch(response as any);
	}

	abstract dispatch(response: HttpResponse | HttpError): PromiseLike<any> | ObservablePretender<any>;

	abstract abort(): void

	abstract resolve(response);

	abstract reject(reason);
}
