import {HttpPipe, HttpPath} from '@js-dot/api/http';

export interface HttpSearchSort {
    /**
     * ?sort
     */
    $sort?: string
}

/**
 * Make API to Sortable using `?sort`
 * `DotApiInterface` Pipe Operator
 */
export function $$sort<P, B, R, NP, NB, NR>()
    : HttpPipe<P, B, R, HttpPath<P, HttpSearchSort>, B, R> {

    return http => {
        return http as any;
    };
}

/**
 * set ?sort
 * @param value
 */
export function $$$sort<P, B, R, NP, NB, NR>(value: string)
    : HttpPipe<P, B, R, P, B, R> {

    return http => {
        http._parameters['$sort'] = value;
        return http;
    };
}
