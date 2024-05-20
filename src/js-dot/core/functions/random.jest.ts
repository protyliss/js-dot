import {random} from './random';

describe('random', () => {
    test('Return 0 or 1 from 1', () => {
        expect(random(1)).toEqual({
            asymmetricMatch: result => [0, 1].includes(result)
        });
    })

    test('Return 1 or 2 from 1', () => {
        expect(random(1, 2)).toEqual({
            asymmetricMatch: result => [1, 2].includes(result)
        })
    })

    test('Return 1 or 2 from [1, 2]', () => {
        expect(random([1, 2])).toEqual({
            asymmetricMatch: result => [1, 2].includes(result)
        })
    })
});
