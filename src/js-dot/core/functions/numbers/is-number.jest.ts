import {isNumber} from './is-number';

describe('isNumber', () => {
    [
        [1, true],
        ['1', true],
        [-2, true],
        ['-2', true],
        [+3, true],
        ['+3', true],
        [4.4, false],
        ['4.4', false],
        [-5.5, false],
        ['-5.5', false],
        [+6.6, false],
        ['+6.6', false],
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
        [{foo: 1}, false],
        [[], false],
        [[1], false],
        [['1'], false]
    ].forEach(([arg, returns]) => {
        test(`${typeof arg} ${arg}`, () => {
            expect(
                isNumber(arg as any)
            )
                .toBe(returns)
        });
    });
});
