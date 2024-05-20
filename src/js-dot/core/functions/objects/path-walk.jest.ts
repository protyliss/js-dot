import {pathWalk} from './path-walk';

describe('pathWalk', () => {

    test('path', () => {
       expect(
           pathWalk({foo: {bar: 1}}, 'foo.bar')
       )
           .toBe(1)
    });

    test('array', () => {
        expect(
            pathWalk({foo: [1, 2]}, 'foo[1]')
        )
            .toBe(2)
    });
});
