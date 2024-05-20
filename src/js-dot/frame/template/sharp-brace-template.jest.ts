import {SharpBraceTemplate} from './sharp-brace-template';

describe('SharpBraceParser', () => {
    test('default', () => {
        expect(
            SharpBraceTemplate.getString(
                'prefix #{varName} suffix',
                {
                    varName: 1
                }
            )
        )
            .toBe(
                'prefix 1 suffix'
            )
    });

    test('invalid variables', () => {
        expect(
            SharpBraceTemplate.getString(
                '#{a} #{{b} #{c}} ##{d}',
                {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                }
            )
        )
            .toBe(
                '1 #{{b} 3} #4'
            )
    });
});
