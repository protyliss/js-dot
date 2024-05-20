import {fromUsvObject} from './from-usv-object';

describe('fromUsvObject', () => {


    test('string', () => {
        expect(
            fromUsvObject(
                'foo=1&bar=2'
            )
        )
            .toStrictEqual({
                foo: 1,
                bar: 2
            });
    });

    test('entry', () => {
        expect(
            fromUsvObject(
                [['foo', 1], ['bar', 2]]
            )
        )
            .toStrictEqual({
                foo: 1,
                bar: 2
            });
    });

    test('object', () => {
        expect(
            fromUsvObject({
                foo: 1,
                bar: 2
            })
        )
            .toStrictEqual({
                foo: 1,
                bar: 2
            });
    });
});
