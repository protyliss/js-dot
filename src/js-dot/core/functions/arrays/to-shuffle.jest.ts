import {toShuffle} from './to-shuffle';

describe('toShuffle', () => {
    it('return shuffled items', () => {
        expect(toShuffle([1, 2])).toEqual(
            expect.arrayContaining([1, 2])
        )
    });
});
