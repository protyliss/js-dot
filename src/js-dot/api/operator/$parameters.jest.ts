import {FetchHttp} from '../fetch/fetch-http';
import {$parameters} from './$parameters';

describe('$parameters', () => {
    const api = new FetchHttp('http://httpbin.org');
    const get$ = api.get<{ $foo: string }>('/get?foo')

    test('$foo to baz', async () => {
        const response = await get$
            .pipe($parameters(parameters => {
                parameters['$foo'] = 'baz'
                return parameters;
            }))
            .request({$foo: 'bar'});

        expect(response.args).toEqual({foo: 'baz'});
    });
});
