import {FetchHttp} from '../fetch/fetch-http';
import {$response} from './$response';
import {$preload} from './$preload';

describe('$preload', () => {
    let preload;
    const api = new FetchHttp('http://httpbin.org');
    const post$ = api.post('/post')
        .pipe(
            $response(response => {
                preload = response.data;
            })
        );

    const get$ = api.get('/get')
        .pipe(
            $preload(post$, {foo: 'bar'})
        )

    test('preloading', async () => {
        const response = await get$.request(null);
        expect(preload).toEqual(JSON.stringify({foo: 'bar'}));
    });
})
