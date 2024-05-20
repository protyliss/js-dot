import {fusion} from './fusion';

describe('fusion', () => {

    it('a with b', () => {
        expect(
            fusion({a: 1}, {b: 2})
        )
            .toStrictEqual({
                a: 1,
                b: 2
            })
    });

    it('array fusion', () => {
       expect(
           fusion(
               {
                   a: [1]
               },
               {
                   a: [2]
               }
           )
       )
           .toStrictEqual({
               a: [1, 2]
           })
    });

    it('string fusion', () => {
        expect(
            fusion(
                {
                    a: ''
                },
                {
                    a: 'hello'
                }
            )
        )
            .toStrictEqual({
                a: 'hello'
            })
    });
});
