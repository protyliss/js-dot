import {isNumeric} from './is-numeric';

describe('is-numeric', () => {

    [
        [1, true],
        ['1', true],
        [-2, true],
        ['-2', true],
        [+3, true],
        ['+3', true],
        [4.4, true],
        ['4.4', true],
        [-5.5, true],
        ['-5.5', true],
        [+6.6, true],
        ['+6.6', true],
        ['7.7.7', false],
        [true, false],
        ['true', false],
        [false, false],
        ['false', false],
        [undefined, false],
        ['undefined', false],
        [null, false],
        ['null', false],
        ['', false],
        [{}, false],
        [{foo:1}, false],
        [[], false],
        [[1], false],
        [['1'], false]
    ].forEach(([arg, returns]) => {
        test(`${typeof arg} ${arg}`, () => {
            expect(
                isNumeric(arg as any)
            )
                .toBe(returns);
        });
    });
});
