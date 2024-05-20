import {HttpPipe, HttpPath} from '@js-dot/api/http';
import {$parameters} from './$parameters';
import {toFilterString} from '@js-dot/core';

export interface HttpSearchFilter {
	/**
	 * ?filter
	 */
	$filter?: string | Record<string, any>;

	/**
	 * ?filter-base
	 */
	$baseFilter?: string | Record<string, any>;
}


/**
 * Make API to Searchable using `?query`
 * `DotApiInterface` Pipe Operator
 */
export function $$filter<P, B, R, NP, NB, NR>()
	: HttpPipe<P, B, R, HttpPath<P, HttpSearchFilter>, B, R> {

	return http => {
		return http.pipe(
			$parameters(parameters => {
				const {$filter, $baseFilter} = parameters as HttpSearchFilter;
				if ($filter && typeof $filter !== 'string') {
					parameters['$filter'] = toFilterString($filter as any);
				}

				if ($baseFilter && typeof $baseFilter !== 'string') {
					parameters['$baseFilter'] = toFilterString($baseFilter as any);
				}
				return parameters;
			})
		) as any;
	};
}

/**
 * Set ?filter
 * @param value
 */
export function $$$filter<P, B, R, NP, NB, NR>(value: string)
	: HttpPipe<P, B, R, P, B, R> {

	return http => {
		http._parameters['$filter'] = value;
		return http;
	};
}

/**
 * Set ?base-filter
 * @param value
 */
export function $$$baseFilter<P, B, R, NP, NB, NR>(value: string)
	: HttpPipe<P, B, R, P, B, R> {

	return http => {
		http._parameters['$base-filter'] = value;
		return http;
	};
}
