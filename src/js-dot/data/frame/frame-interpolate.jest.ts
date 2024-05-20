import {frameInterpolate} from './frame-interpolate';

describe('frameInterpolate', () => {
    test('With Headers', () => {
        expect(
            frameInterpolate([
                ['a', 'b', 'c'],
                [1],
                [undefined, 2],
                [undefined, undefined, 3]
            ])
        )
            .toStrictEqual([
                ['a', 'b', 'c'],
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3]
            ])
    })
});