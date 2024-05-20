import {toFilled} from './to-filled';

describe('toFilled', () => {
    it('return not emptied items', () => {
        expect(toFilled([true, null, undefined])).toEqual([true])
    });
})
