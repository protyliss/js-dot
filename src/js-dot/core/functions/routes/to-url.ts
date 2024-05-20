import {addSearchStringValue} from './add-search-string-value';

export function toUrl(path_or_slug: string | string[], query?: string | Record<string, number | string>): string;
export function toUrl(path_or_slug, queryString_or_queryMap?) {
	const url = Array.isArray(path_or_slug) ?
		path_or_slug.join('/') :
		path_or_slug;

	let query = queryString_or_queryMap;

	if (typeof query === 'object') {
		const queryStringArray = [];
		const queryNames = Object.keys(query);
		const end = queryNames.length;
		let current = -1;
		while (++current < end) {
			const queryName = queryNames[current];
			const queryValue = query[queryName];
			if (queryValue || queryValue === 0) {
				queryStringArray.push(queryName + '=' + queryValue);
			}
			query = queryStringArray.join('&');
		}
	}
	
	return addSearchStringValue(url, query);
}
