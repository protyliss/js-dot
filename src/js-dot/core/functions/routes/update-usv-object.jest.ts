import {updateUsvObject} from './update-usv-object';

describe('updateUsvObject', () => {

    const result = {
        foo: 1,
        bar: 2,
        baz: 'baz'
    }

    test('string with string', () => {
        expect(
            updateUsvObject(
                'foo=1&bar=2',
                'foo=foo&baz=baz'
            )
        )
            .toStrictEqual(result);
    });

    test('entry with string', () => {
        expect(
            updateUsvObject(
                [['foo', 1], ['bar', 2]],
                'foo=foo&baz=baz'
            )
        )
            .toStrictEqual(result);
    });

    test('object with string', () => {
        expect(
            updateUsvObject(
                {foo: 1, bar: 2},
                'foo=foo&baz=baz'
            )
        )
            .toStrictEqual(result);
    });

    test('null with string', () => {
        expect(
            updateUsvObject(
                null,
                'foo=foo&baz=baz'
            )
        )
            .toStrictEqual({
                foo: 'foo',
                baz: 'baz'
            });
    });

    test('string with entry', () => {
        expect(
            updateUsvObject(
                'foo=1&bar=2',
                [['foo', 'foo'], ['baz', 'baz']]
            )
        )
            .toStrictEqual(result);
    });

    test('entry with entry', () => {
        expect(
            updateUsvObject(
                [['foo', 1], ['bar', 2]],
                [['foo', 'foo'], ['baz', 'baz']]
            )
        )
            .toStrictEqual(result);
    });

    test('object with object', () => {
        expect(
            updateUsvObject(
                {foo: 1, bar: 2},
                {foo: 'foo', baz: 'baz'}
            )
        )
            .toStrictEqual(result);
    });

    test('null with null', () => {
        expect(
            updateUsvObject(
                null,
                null
            )
        )
            .toStrictEqual({});
    });
});
