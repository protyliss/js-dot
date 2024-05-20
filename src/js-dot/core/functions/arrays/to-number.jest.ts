import {toNumber} from './to-number';

describe('toNumber', () => {
    it('return number items', () =>{
        expect(toNumber(['1'])).toEqual([1])
    });
})
