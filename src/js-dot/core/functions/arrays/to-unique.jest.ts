import {toUnique} from './to-unique';

describe('getUnique', () => {
    it('return [1]', () => {
        expect(toUnique([1, 1])).toEqual([1])
    });
})
