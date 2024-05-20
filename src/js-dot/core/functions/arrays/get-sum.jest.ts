import {getSum} from './get-sum';

describe('getSum', () => {
    it('return 1', () => {
        expect(getSum([2, -1])).toBe(1)
    });
})
