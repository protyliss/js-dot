import {HttpError, HttpOption, HttpRequester, HttpRequesterBase, HttpResponse} from '@js-dot/api/http';
import {FetchHttpClient} from './fetch-http-client';

/**
 * `HttpRequester` Implementor using `FetchHttpClient`
 */
export class FetchHttp<P = any, B = any, R = any>
	extends HttpRequesterBase<P, B, R>
	implements HttpRequester<P, B, R> {
	_getHttpRequester() {
		return FetchHttp;
	}

	_getHttpClient() {
		return FetchHttpClient;
	}

	_execute(request, formalParameters?: P, formalBody?: B, option: Partial<HttpOption> = {}) {
		const {
				  meta: {
					  client,
					  transforms: {
						  responses: responseTransformers
					  },
					  interceptors: {
						  responses: responseInterceptors,
						  lastResponses: lastResponseInterceptors
					  }
				  },
			  } = this;

		let fetcher = request.fetch(client);

		const responseInterceptorEnd = [responseInterceptors, ...lastResponseInterceptors].length;
		const responseTransformEnd   = responseTransformers.length;


		if (responseInterceptorEnd || responseTransformEnd) {


			if(responseTransformEnd){
				fetcher = fetcher.then(response => {
					// console.debug(5);
					return request.next(request.response)
						.then(responseBody => {
							let current = -1;
							while (++current < responseTransformEnd) {
								responseBody = responseTransformers[current](
									responseBody,
									{
										parameters: formalParameters,
										body: formalBody
									}
								);
							}
							return request.resolve(responseBody);
						});
				})
			}


			if(responseInterceptorEnd){
				const intercept = (response) => {
					return this._responseIntercept(request);
				}

				fetcher = fetcher.then(intercept, intercept);
			}

		} else {
			fetcher = fetcher.then(response => {
				return request.next(response);
			})
		}

		return fetcher;
	}
}
