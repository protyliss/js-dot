import {casting} from './casting';

describe('casting', () => {
    test('Return "1" to 1', () => {
        expect(casting('1')).toBe(1)
    });

    test('Return "1.1" to 1', () => {
        expect(casting('1.1')).toBe(1.1)
    });

    test('Return "true" to true', () => {
        expect(casting('true')).toBe(true)
    });

    test('Return "false" to false', () => {
        expect(casting('false')).toBe(false)
    });

    test('foo', () => {
        expect(casting('foo')).toBe('foo');
    });
});
