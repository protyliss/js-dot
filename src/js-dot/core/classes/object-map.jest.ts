import {ObjectMap} from './object-map';

describe('ObjectMap', () => {
    test('default', () => {
        interface Foo {
            bar: string;
            baz: number;
            quz: {
                foo: number;
            }
        }

        const foo: Foo = {
            bar: 'a',
            baz: 1,
            quz: {
                foo: 2
            }
        };

        interface Alpha {
            bravo: string;
            charlie: string;
            delta: string;
        }

        const map = new ObjectMap<Foo, keyof Alpha>({
            bravo: 'bar',
            charlie: 'baz',
            delta: 'quz.foo'
        });

        expect(
            map.get(foo, 'bravo')
        )
            .toBe('a')

        expect(
            map.get(foo, 'charlie')
        )
            .toBe(1);

        expect(
            map.get(foo, 'delta')
        )
            .toBe(2);

        expect(
            map.getAll(foo)
        )
            .toStrictEqual({
                bravo: 'a',
                charlie: 1,
                delta: 2
            })
    })
})