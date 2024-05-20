import {HttpPipe} from '@js-dot/api/http';

/**
 * Get API List
 */
export function entries$<P, B, R, NP, NB, NR>()
: HttpPipe<P, B, R, P, B, R>{
    return http => {
        return http['_operators'].reduce((meta, operator) => {
            return meta.concat(
                [
                    [operator.method, operator.url]
                ],
                operator.pipe(entries$())
            );
        }, []);
    }
}
