import {combinates} from './combinates';

describe('combinates', () => {
    test('Return [[1], [2], [1,2]] from [1, 2])', () => {
        expect(combinates([1, 2])).toEqual([[1], [2], [1, 2]]);
    })
});
