import {$credentials} from './$credentials';
import {FetchHttpRoot} from '../fetch/public-api';

describe('$credential', () => {
    const api = new FetchHttpRoot('http://httpbin.org');

    const post$ = api.post('/post')

    const body = {foo: 'bar'};
    const bodyString = JSON.stringify(body);

    test('credential to true', async () => {
        const response = await post$
            .pipe($credentials())
            .request(null, body)
        console.log(response);
        expect(response.data).toBe(bodyString)
    });
});
