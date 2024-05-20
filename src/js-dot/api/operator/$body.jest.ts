import {FetchHttp} from '../fetch/fetch-http';
import {$body} from './$body';

describe('$body', () => {
    const api = new FetchHttp('http://httpbin.org');
    const post$ = api.post('/post');

    const body = {foo: 'bar'};

    test('foo to baz', async () => {
        const response = await post$
            .pipe($body(body => {
                body['foo'] = 'baz'
                return body;
            }))
            .request(null, body)

        expect(response.data).toBe(JSON.stringify({foo:'baz'}))
    });
});
