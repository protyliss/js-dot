import {HttpCredentials, HttpPipe} from '@js-dot/api/http';

/**
 * Credential Flag
 *  `DotApiInterface` Pipe Operator Factory
 * @param type
 */
export function $credentials<P, B, R, NP, NB, NR>(type: HttpCredentials | boolean = 'include'): HttpPipe<P, B, R, P, B, R> {
    if (typeof type === 'boolean') {
        type = type ?
            'include' :
            'same-origin'
    }

    return http => {
        http.credentials = type as HttpCredentials;
        return http;
    };
}
