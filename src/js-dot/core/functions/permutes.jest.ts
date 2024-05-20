import {permutes} from './permutes';

describe('permutes', () => {
    test('Return [[1], [2], [1, 2], [2, 1]] from [1, 2]', () => {
        expect(permutes([1, 2])).toEqual([[1], [2], [1, 2], [2, 1]]);
    });
})
