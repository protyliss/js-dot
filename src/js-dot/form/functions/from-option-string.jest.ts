import {fromOptionString} from './from-option-string';

describe('fromOptionString', () => {
    test('value only', () => {

        expect(
            fromOptionString(`
                1
                2
                3
            `)
        )
            .toStrictEqual([
                {
                    value: '1',
                    text: '1'
                },
                {
                    value: '2',
                    text: '2'
                },
                {
                    value: '3',
                    text: '3'
                }
            ])
    });

    test('text and value', () => {

        expect(
            fromOptionString(`
                1:foo
                2:bar
                3:baz
            `)
        )
            .toStrictEqual([
                {
                    value: '1',
                    text: 'foo'
                },
                {
                    value: '2',
                    text: 'bar'
                },
                {
                    value: '3',
                    text: 'baz'
                }
            ])
    });

    test('mixed', () => {
        expect(
            fromOptionString(`
                1:foo
                2
                3:baz
            `)
        )
            .toStrictEqual([
                {
                    value: '1',
                    text: 'foo'
                },
                {
                    value: '2',
                    text: '2'
                },
                {
                    value: '3',
                    text: 'baz'
                }
            ])
    });

    test('inline', () => {
        expect(
            fromOptionString(`1:foo;2:bar`)
        )
            .toStrictEqual([
                {
                    value: '1',
                    text: 'foo'
                },
                {
                    value: '2',
                    text: 'bar'
                },
            ])
    });
});
