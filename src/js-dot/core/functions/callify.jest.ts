import {callify} from './callify';

describe('callify', () => {
    it('function', () => {
        expect(callify(() => 'a')).toBe('a')
    });

    it('not a function', () => {
        expect(callify('b')).toBe('b')
    })
});
