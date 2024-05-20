import {seriesToFrame} from './series-to-frame';

describe('seriesToFrame', () => {

    test('default', () => {
        expect(
            seriesToFrame(
                [1, 2, 3, 4, 5, 6],
                2
            )
        )
            .toStrictEqual(
                [
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ]
            );
    });

    test('transpose', () => {
        expect(
            seriesToFrame(
                [1, 2, 3, 4, 5, 6],
                2,
                true
            )
        )
            .toStrictEqual(
                [
                    [1, 3, 5],
                    [2, 4, 6]
                ]
            );
    });

});
