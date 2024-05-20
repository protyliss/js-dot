import {fromSearchString} from './from-search-string';

describe('fromSearchString', () => {

    test('startsWith ?', () => {
        expect(fromSearchString('?string=string&number=1&boolean=true'))
            .toStrictEqual({
                string: 'string',
                number: 1,
                boolean: true
            });
    });

    test('startsWith Out ?', () => {
        expect(fromSearchString('string=string&number=1&boolean=true'))
            .toStrictEqual({
                string: 'string',
                number: 1,
                boolean: true
            });
    });
})
