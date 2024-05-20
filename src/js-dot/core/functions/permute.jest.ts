import {permute} from './permute';

describe('permute', () => {
    test('Return ~~', () => {
       expect(permute([1, 2])).toEqual([[1, 2], [2, 1]]);
    });
})
