import {DoubleBraceTemplate} from './double-brace-template';

describe('doubleBraceTemplate', () => {
    test('default', () => {

        expect(
            DoubleBraceTemplate.getString(
                'prefix {{varName}} suffix',
                {
                    varName: 1
                }
            )
        )
            .toBe(
                'prefix 1 suffix'
            )
    });
});
