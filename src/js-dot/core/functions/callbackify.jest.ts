import {callbackify} from './callbackify';

describe('callbackify', () => {
    it('not a function', () => {
        callbackify('a', (error, value) => {
            expect(value).toBe('a');
        });
    })

    it('function', () => {
        callbackify(() => 'b', (error, value) => {
            expect(value).toBe('b');
        });
    })

    it('promise', () => {
        callbackify(Promise.resolve('c'), (error, value) => {
            expect(value).toBe('c');
        });
    })
});
