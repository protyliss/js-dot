import {API_LOG} from '@js-dot/api';
import {HttpPipe, HttpRequest, HttpResponse} from '@js-dot/api/http';
import {$intercept} from '../$intercept';
import {API_MEMORIES, defaultMemoryId} from './memory';

export interface ApiSetMemoryOption {
	/**
	 * Cache IDs as Static
	 * @default undefined
	 */
	ids: string | string[],

	/**
	 * Cache ID Generate Function
	 * @description
	 * - if id starts with `^`, will remove all of started of it.
	 * - if id starts with `~`, will remove all of contains of it
	 * @default (request) => request.url
	 * @param request
	 */
	getIds(request: HttpRequest): string | string[];
}

const DEFAULT_REMOVE_MEMORY_OPTION = {
	getIds: defaultMemoryId
};


/**
 * Set Memory as Remover
 * @example
 * ```js
 * const http = new FetchHttp('https://httpbin.org/get');
 * ```
 * @param option
 */
export function $memory<P, B, R, NP, NB, NR>(option?: Partial<ApiSetMemoryOption>)
	: HttpPipe<P, B, R, P, B, R> {

	option = {
		...DEFAULT_REMOVE_MEMORY_OPTION,
		...(option || {})
	};

	const {ids: staticIds, getIds} = option;

	return http => {
		return http.pipe(
			$intercept({
				response: $memory_responseInterceptor
			})
		) as any;
	}

	function $memory_responseInterceptor(response: HttpResponse) {
		if (response.ok) {
			let ids = staticIds || getIds(response.request);

			if (!Array.isArray(ids)) {
				ids = [ids];
			}

			API_LOG.debug("[js.api.$memory] Remove ID Condition", ids);

			let current = ids.length;
			while (current-- > 0) {
				let id          = ids[current];
				const firstChar = id[0];
				switch (id[0]) {
					case '^':
						id = id.slice(1);
						for (let key in API_MEMORIES) {
							if (!API_MEMORIES.hasOwnProperty(key)) {
								continue;
							}
							if (key.startsWith(id)) {
								API_LOG.debug('[js.api.$memory] Remove ID', key);
								delete API_MEMORIES[key];
							}
						}
						break;
					case '~':
						id = id.slice(1);
						for (let key in API_MEMORIES) {
							if (!API_MEMORIES.hasOwnProperty(key)) {
								continue;
							}
							if (key.indexOf(id) > -1) {
								API_LOG.debug('[js.api.$memory] Remove ID', key);
								delete API_MEMORIES[key];
							}
						}
						break;
					default:
						if (API_MEMORIES.hasOwnProperty(id)) {
							API_LOG.debug('[js.api.$memory] Remove ID', id);
							delete API_MEMORIES[id];
						}
				}
			}
		}
		return response;
	}
}
