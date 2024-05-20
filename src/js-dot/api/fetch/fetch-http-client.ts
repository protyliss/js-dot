import {HttpClientBase, HttpDefaultBody, HttpHeaders, HttpMethod, HttpOption} from '@js-dot/api/http';
import {FetchHttpRequest} from './fetch-http-request';

/**
 * Http Client Using Fetch and Promise
 */
export class FetchHttpClient<T = any> extends HttpClientBase<FetchHttpRequest<T>> {
    _execute(method: HttpMethod, url: string, body?: HttpDefaultBody, option?: Partial<HttpOption>) {
        option = Object.assign(
            {
                method,
                headers: null,
                accept: 'application/json',
                body
            },
            option || {}
        ) as HttpOption;

        let {accept, headers: optionHeaders} = option;

        const headers = new HttpHeaders(optionHeaders);

        headers.set('Accept', accept as string);

        if (method !== 'GET') {
            if (!headers.get('Content-Type') && body?.constructor.name !== 'FormData') {
                headers.set('Content-Type', 'application/json');
            }

            if (
                headers.get('Content-Type') === 'application/json'
                && typeof option['body'] !== 'string'
            ) {
                option['body'] = JSON.stringify(option['body']);
            }
        }

        option.headers = headers.values;
        option.credentials = option.credentials || this.credentials;

        return new FetchHttpRequest(method, url, body, option);
    }
}
