import {toFilterString} from './to-filter-string';

describe('toFilterString', () => {
    [
        [
            {
                a: '1 after space',
                b: 2
            },
            'a:1*after*space;b:2'
        ],

        [
            {
                a: [1, 2],
                b: [3, 4]
            },
            'a:1,2;b:3,4'
        ],

        [
            {
                timeToDate: new Date(
                    2021,
                    11 - 1,
                    30
                )
            },
            'timeToDate:20211130.09'
        ],

        [
            {
                timeToMinute: new Date(
                    2021,
                    11 - 1,
                    30,
                    11,
                    30,
                )
            },
            'timeToMinute:202111301130.09'
        ],

        [
            {
                notContext: 'NOT 1',
                andContext: '1 AND 2',
                orContext: '1 OR 2'
            },
            'notContext:!1;andContext:1:2;orContext:1,2'
        ],
    ].forEach(([values, query]) => {
        test(JSON.stringify(values) + ' to ' + query, () => {
            expect(
                toFilterString(values as any)
            )
                .toBe(query)
        })
    });

    // test('Or Conditions', () => {
    //     expect(
    //         toFilterString({
    //             foo: 1,
    //             bar: 2
    //         }, true)
    //     )
    //         .toBe('foo:1/bar:2')
    // });
    //
    // test('Keyword Escape', () => {
    //     expect(
    //         toFilterString({
    //             escape: 'NOT 1*2:3;4/5!6',
    //         })
    //     )
    //         .toBe('escape:!1!*2!:3!;4!/5!!6')
    // });
});
