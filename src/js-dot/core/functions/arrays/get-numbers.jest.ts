import {getNumbers} from './get-numbers';

describe('getNumbers', () => {
    it('return [0, 1]', () => {
        expect(getNumbers(1)).toEqual([0, 1])
    })

    it('return [1, 2]', () => {
        expect(getNumbers(1, 2)).toEqual([1, 2])
    })
})
