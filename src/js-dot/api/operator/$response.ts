import {HttpPipe, HttpResponseTransformCallback} from '@js-dot/api/http';
import {IteratorBase} from '@js-dot/core';


/**
 * Transform Response Body
 * : `HttpRequester` Pipe Operator Factory
 * @example
 * ```js
 * const http = (new FetchHttp('GET', 'https://httpbin.org/get'))
 *    .pipe(
 *      $response(response => {
 *      	// Update Response
 *  		response['transformed'] = true;
 *		    return response;
 * 	    })
 *    );
 * ```
 * @param callback
 */
export function $response<P, B, R, NP, NB, NR>(callback: HttpResponseTransformCallback<P, B, R, NP, NB, NR>): HttpPipe<P, B, R, P, B, NR>
/**
 * Transform Response Body to Iterator
 * : `HttpRequester` Pipe Operator Factory
 *
 * @description
 * Transform with Iterable class uses half of number of transform with callback
 *
 * @see IteratorBase
 * @example
 * Transform `headers` property to an iterable object as `{key, value}`
 *
 * ```js
 * const http = (new FetchHttp('GET', 'https://httpbin.org/get'))
 *    .pipe($response(
 *      class extends ArrayIteratorBase {
 *          constructor(response){
 *              super(Object.entries(response.headers))
 *          }
 *          _builtInMap([key, value]){
 *              return {
 *                  key, value
 *              }
 *          }
 *      }
 *    ));
 * ```
 * @param iterator the IteratorBase Implementor
 */
export function $response<P, B, R, NP, NB, NR>(iterator: (new(arg: R) => NR)): HttpPipe<P, B, R, P, B, NR>;
export function $response(callback_or_iterator) {

    return http => {
        const {responses} = http.meta.transforms;
        responses[responses.length] = callback_or_iterator;

        return http as any;
    }
}
