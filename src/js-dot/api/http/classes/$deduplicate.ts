import {API_LOG} from '@js-dot/api';
import {HttpError} from './http-error';
import {HttpRequest} from './http-request';
import {HttpResponse} from './http-response';

const DUPLICATED_REQUESTS = {};

export function $deduplicate_requestInterceptor(request: HttpRequest) {
	const {method, url} = request;
	if (
		request.option['$deduplicate'] === false
		|| request.option['$merge'] === true
		|| method !== 'GET'
	) {
		// console.group(request.url);
		// console.debug(`request.option['$deduplicate']`, request.option['$deduplicate']);
		// console.debug(`request.option['$merge']`, request.option['$merge']);
		// console.debug(`method`, method);
		// console.groupEnd();
		return request;
	}

	const duplicatedRequests = DUPLICATED_REQUESTS[url];
	if (duplicatedRequests) {
		// API_LOG.debug(`[js.api.$deduplicate] ${url}`);
		return new Promise((resolve, reject) => {
			duplicatedRequests[duplicatedRequests.length] = [resolve, reject];
		})
	} else {
		DUPLICATED_REQUESTS[url] = [];
	}

	return request;
}

export function $deduplicate_responseInterceptor(response: HttpResponse) {
	if (!(response instanceof HttpResponse)) {
		return response;
	}

	const {method, url} = response.request

	if (method !== 'GET') {
		return response;
	}

	const duplicatedRequest = DUPLICATED_REQUESTS[url];
	delete DUPLICATED_REQUESTS[url];

	let current = duplicatedRequest?.length;

	if (current) {
		API_LOG.debug(`[js.api.$deduplicate] ${url} (${duplicatedRequest.length} duplicates)`);
		
		const index = response instanceof HttpError ? 1 : 0

		while (current-- > 0) {
			duplicatedRequest[current][index](response);
		}
	}

	return response;
}
