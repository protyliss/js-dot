import {fromDataMapKeySeries} from './from-data-map-key-series';

describe('fromMapInColumnMap', () => {

    test('transpose', () => {
        const series = {
            'foo': [
                {date: 'label1', value: 1},
                {date: 'label2', value: 1}
            ],
            'bar': [
                {date: 'label1', value: 2},
                {date: 'label2', value: 2}
            ],
        };

        const frame = fromDataMapKeySeries(series, {
            labelIndex: 'date',
            valueIndex: 'value'
        });

        const expected = [
            ['date', 'foo', 'bar'],
            ['label1', 1, 2],
            ['label2', 1, 2]
        ];

        console.log(series);
        console.log(frame);

        expect(frame).toStrictEqual(expected);
    });
});
