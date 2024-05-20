import {FetchHttp} from './fetch-http';

describe('FetchApi', () => {

    const api = new FetchHttp('http://httpbin.org');

    const $get = api.get('/get');
    const $post = api.post('/post');
    const $put = api.put('/put');
    const $patch = api.patch('/patch');
    const $delete = api.delete('/delete');

    const body = {foo: 'bar'};
    const bodyString = JSON.stringify(body);

    test('get', async () => {
        const response = await $get.request(null);
        expect(response.url).toBe($get.url);
    });

    test('post', async () => {
        const response = await $post.request(null, body);
        expect(response.data).toEqual(bodyString);
    });

    test('put', async () => {
        const response = await $put.request(null, body);
        expect(response.data).toEqual(bodyString);
    });

    test('patch', async () => {
        const response = await $patch.request(null, body);
        expect(response.data).toEqual(bodyString);
    });

    test('delete', async () => {
        const response = await $delete.request(null);
        expect(response.url).toBe($delete.url);
    });
})
