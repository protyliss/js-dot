import {toRgba} from './to-rgba';

describe('toRgba', () => {
    [
        ['transparent', 'rgba(0, 0, 0, 0)'],
        ['blackout', 'rgba(0, 0, 0, 0)'],
        ['whiteout', 'rgba(255, 255, 255, 0)'],
        ['0, 1', 'rgba(0, 0, 0, 1)'],
        ['255, .5', 'rgba(255, 255, 255, 0.5)'],
        ['1, 2, 3', 'rgba(1, 2, 3, 1)'],
        ['1, 2, 3, .5', 'rgba(1, 2, 3, 0.5)'],
        [['255'], 'rgba(255, 255, 255, 1)'],
        [['0', 0], 'rgba(0, 0, 0, 0)'],
        [[1, 2, 3, 1], 'rgba(1, 2, 3, 1)'],
        ['000', 'rgba(0, 0, 0, 1)'],
        ['0000', 'rgba(0, 0, 0, 0)'],
        ['#000', 'rgba(0, 0, 0, 1)'],
        ['#0000', 'rgba(0, 0, 0, 0)'],
        ['fff', 'rgba(255, 255, 255, 1)'],
        ['ffff', 'rgba(255, 255, 255, 1)'],
        ['#fff', 'rgba(255, 255, 255, 1)'],
        ['#ffff', 'rgba(255, 255, 255, 1)'],
    ].forEach(([source, rgba]) => {
        test(`${source} to ${rgba}`, () => {
            expect(toRgba(source)).toBe(rgba);
        })
    });

    test(`blackout to rgba(0, 0, 0, 1)`, () => {
        expect(toRgba('blackout', 1)).toBe('rgba(0, 0, 0, 1)');
    })
});
