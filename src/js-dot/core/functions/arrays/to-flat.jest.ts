import {toFlat} from './to-flat';

describe('toFlat', () => {
    it('return flatten items', () => {
        expect(toFlat([1, [2], [[3]]])).toEqual([1, 2, 3]);
    })
})
