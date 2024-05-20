import {isPromise} from './is-promise';

describe('is-promise', () => {
    it('promise', () => {
        expect(isPromise(Promise.resolve())).toBe(true);
    });

    it('promise like', () => {
        expect(isPromise({
            then: () => {
            }
        })).toBe(true);
    })

    it('not promise', () => {
        expect(isPromise(1)).toBe(false)
    })
})
