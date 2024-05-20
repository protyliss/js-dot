import {globToRegex} from './glob-to-regex';

describe('globToRegex', () => {
    test('a/a', () => {
        const regex = globToRegex('a/a');

        expect(regex.test('a/a')).toBe(true);
        expect(regex.test('a/b')).toBe(false);
    });

    test('*/a', () => {
        const regex = globToRegex('*/a');
        expect(regex.test('a/a')).toBe(true)
        expect(regex.test('b/a')).toBe(true)
    });

    test('a/{a, b}', () => {
        const regex = globToRegex('a/{a, b}');
        expect(regex.test('a/a')).toBe(true)
        expect(regex.test('a/b')).toBe(true)
        expect(regex.test('a/c')).toBe(false)
    });
})