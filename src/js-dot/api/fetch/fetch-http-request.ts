import {HttpError, HttpRequest, HttpResponse} from '@js-dot/api/http';

/**
 * Http Request from FetchHttpClient
 */
export class FetchHttpRequest<T = HttpResponse> extends HttpRequest<Promise<T>> {
	#abortController!: AbortController;

	fetch() {
		const abortController = new AbortController();
		this.#abortController = abortController;

		return fetch(
			this.url,
			{
				...this.option,
				signal: abortController.signal
			} as RequestInit
		)
			.then(response => {
				this.response = new HttpResponse(this, response);
				return response;
			})
			.catch(reason => {
				this.response = new HttpError(this, reason);
				return this.response;
			})
	}

	dispatch(response: HttpResponse) {
		if (response instanceof Promise) {
			return response
				.then(response_ => {
					return this.dispatch(response_);
				})
				.catch(reason => {
					return this.dispatch(reason);
				})
		}

		if (
			response instanceof Response
			|| response instanceof HttpResponse
		) {
			if (!response.ok) {
				const error = new HttpError(this, response);
				this.response = error;
				return Promise.reject(error);
			}

			const {option} = this;
			const {accept} = option;

			if (accept === 'application/json') {
				return response.json();
			} else if (accept.startsWith('text/')) {
				return response.text();
			}
		}
		return Promise.resolve(response);
	}

	resolve(response) {
		return Promise.resolve(response);
	}

	reject(response) {
		return Promise.reject(response);
	}

	abort() {
		this.#abortController.abort();
	}
}
