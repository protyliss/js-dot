import {fromFilterString} from './from-filter-string';
import {toFilterString} from './to-filter-string';
import {toDateDigit} from '../../date/to-date-digit';

describe('decodeSearchQuery', () => {
    test('default', () => {
        expect(
            fromFilterString(
                toFilterString({
                    foo: 1,
                    bar: 'string'
                })
            )
        )
            .toStrictEqual({
                foo: 1,
                bar: 'string'
            });
    });

    test('has timestamp', () => {
        const date1 = new Date(2345, 0, 2, 3, 4, 5);
        const date2 = new Date(2345, 10, 20);

        const hasTimestamp = fromFilterString(
            toFilterString({
                date1: toDateDigit(date1),
                date2: toDateDigit(date2)
            })
        );

        expect(hasTimestamp.date1.toISOString()).toBe(date1.toISOString());
        expect(hasTimestamp.date2.toISOString()).toBe(date2.toISOString());
    });
});
