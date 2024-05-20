import {fromDataArraySeries} from './from-data-array-series';
import {frameStringify} from './frame-stringify';

describe('seriesToFrame', () => {

    test('transpose', () => {
        const series = [
            ['label1', 'foo', 1],
            ['label1', 'bar', 2],
            ['label2', 'foo', 1],
            ['label2', 'bar', 2]
        ];

        const frame = fromDataArraySeries(series);

        const expected = [
            ['date', 'foo', 'bar'],
            ['label1', 1, 2],
            ['label2', 1, 2]
        ];

        console.log(frameStringify(series));
        console.log(frameStringify(frame));

        expect(frame).toStrictEqual(expected);
    });

    test('keep order', () => {

        const series = [
            [2, 'foo', 1],
            [2, 'bar', 2],
            [1, 'foo', 1],
            [1, 'bar', 2]
        ];

        const frame = fromDataArraySeries(series);

        const expected = [
            ['date', 'foo', 'bar'],
            [2, 1, 2],
            [1, 1, 2]
        ];

        console.log(frameStringify(series));
        console.log(frameStringify(frame));

        expect(frame).toStrictEqual(expected);
    });
});
