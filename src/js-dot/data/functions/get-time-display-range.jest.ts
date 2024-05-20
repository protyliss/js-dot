import {getTimeDisplayRange} from './get-time-display-range';

describe('getTimeShortenerCondition', function () {
    test('origin', () => {
        expect(
            getTimeDisplayRange([
                ['2022-11-30T02:00:00'],
                ['2023-12-31T03:01:01'],
            ])
        )
            .toBe('origin')
    });

    test('year-minute', () => {
       expect(
           getTimeDisplayRange([
               ['2022-11-30T02:00:00'],
               ['2023-12-31T03:01:00'],
           ])
       )
           .toBe('year-minute')
    });

    test('year-hour', () => {
        expect(
            getTimeDisplayRange([
                ['2022-11-30T02:00:00'],
                ['2023-12-31T03:00:00'],
            ])
        )
            .toBe('year-hour')
    });

    test('year-day', () => {
        expect(
            getTimeDisplayRange([
                ['2022-11-30T02:00:00'],
                ['2023-12-31T02:00:00'],
            ])
        )
            .toBe('year-day')
    });

    test('year-month', () => {
        expect(
            getTimeDisplayRange([
                ['2022-11-30T02:00:00'],
                ['2023-12-30T02:00:00'],
            ])
        )
            .toBe('year-month')
    });

    test('year', () => {
        expect(
            getTimeDisplayRange([
                ['2022-11-30T02:00:00'],
                ['2023-11-30T02:00:00'],
            ])
        )
            .toBe('year')
    });

    test('same year?', () => {
        expect(
            getTimeDisplayRange([
                ['2022-11-30T02:00:00'],
                ['2022-11-30T02:00:00'],
            ])
        )
            .toBe('origin')
    });
});