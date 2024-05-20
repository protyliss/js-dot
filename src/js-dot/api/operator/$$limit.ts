import {HttpPath} from '@js-dot/api/http';
import {HttpPipe, HttpResponseTransformCallback} from '@js-dot/api/http';
import {$response} from './$response';

export interface HttpSearchLimit {
	/**
	 * ?limit
	 */
	$limit?: number;

	/**
	 * ?page
	 */
	$page?: number;
}

export interface HttpSearchListResponse<T> {
	meta: {
		total: number
	}
	dataset: T[];
}

/**
 * Make API to Pages using `?limit&page`
 * `DotApiInterface` Pipe Operator
 */
export function $$limit<P, B, R, NP, NB, NR>(callback: HttpResponseTransformCallback<P, B, R, NP, NB, NR> = fixArrayToList)
	: HttpPipe<P, B, R, HttpPath<P, HttpSearchLimit>, B, HttpSearchListResponse<R>> {

	return http => {
		return http.pipe(
			$response(callback)
		) as any;
	};
}

const {isArray: IS_ARRAY} = Array;

function fixArrayToList(response) {
	if (IS_ARRAY(response)) {
		response = {
			meta: {
				total: response.length
			},
			dataset: response
		}
	}

	return response;
}


/**
 * Set `?limit&page`
 * @param limit
 * @param page
 */
export function $$$limit<P, B, R, NP, NB, NR>(limit: number, page?: number)
	: HttpPipe<P, B, R, P, B, R> {

	if (limit < 1) {
		throw RangeError(`$limit cannot be less than 1`)
	}

	if (page < 1) {
		throw RangeError(`$page cannot be less than 1`)
	}

	return http => {
		const {_parameters} = http;
		_parameters['$limit'] = limit;
		_parameters['$page'] = page;
		return http;
	};
}
