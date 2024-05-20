import {HttpRequester, HttpPipe} from '@js-dot/api/http';

export function $preload<P, B, R, NP, NB, NR>(preloadApi: HttpRequester, body?): HttpPipe<P, B, R, P, B, R> {
    return http => {
        const {_preloadApis} = http;
        _preloadApis[_preloadApis.length] = [preloadApi, body];
        return http;
    }
}
