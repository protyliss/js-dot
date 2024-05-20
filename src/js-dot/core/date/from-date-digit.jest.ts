import {fromDateDigit} from './from-date-digit';

describe('fromDateDigit', () => {
    test('to day', () => {
        expect(
            fromDateDigit('20221130').getTime()
        )
            .toBe(
                (new Date(2022, 11 - 1, 30)).getTime()
            )
    });

    test('to seconds', () => {
        expect(
            fromDateDigit('20221130010203').getTime()
        )
            .toBe(
                (new Date(2022, 11 - 1, 30, 1, 2, 3)).getTime()
            )
    });

    test('with timezone', () => {
        const a = fromDateDigit(2022113009.09);
        const b = (new Date('2022-11-30T09:00:00.000+09:00'));
        console.log(new Date(a.getTime()));
        console.log(new Date(b.getTime()));
        expect(a.getTime()).toBe(b.getTime())
    });
});