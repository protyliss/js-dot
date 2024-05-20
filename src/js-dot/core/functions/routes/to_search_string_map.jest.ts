import {toSearchStringMap} from './to_search_string_map';

describe('toSearchStringMap', () => {
    const result = {
        foo: 1,
        bar: 2
    }
    test('string', () => {
        expect(
            toSearchStringMap('foo=1&bar=2')
        )
            .toStrictEqual(result)
    });

    test('array', () => {
        expect(
            toSearchStringMap(['foo=1', 'bar=2'])
        )
            .toStrictEqual(result)
    });

    test('entry array', () => {
        expect(
            toSearchStringMap([['foo', 1], ['bar', 2]])
        )
            .toStrictEqual(result)
    });

    test('null', () => {
        expect(
            toSearchStringMap(null)
        )
            .toStrictEqual({})
    });

    test('null string', () => {
        expect(
            toSearchStringMap('')
        )
            .toStrictEqual({})
    });

    test('null array', () => {
        expect(
            toSearchStringMap([])
        )
            .toStrictEqual({})
    });
});
