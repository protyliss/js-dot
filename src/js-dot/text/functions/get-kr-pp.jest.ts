import {getKrPp} from './get-kr-pp';

describe('getKrPp', () => {
    [
        ['각', '는', '은'],
        ['나', '은', '는'],
        ['나', '는', '는'],
        ['날', '은', '은'],
        ['날', '는', '은'],
        ['비', '이', '가'],
        ['비', '가', '가'],
        ['제', '이', '가'],
        ['제', '가', '가'],
        ['나', '이', '가'],
        ['나', '가', '가'],
        ['빵', '이', '이'],
        ['빵', '가', '이'],
        ['나', '로', '로'],
        ['나', '으로', '로'],
        ['발음', '와', '과'],
        ['발음', '과', '과'],
        ['친구', '와', '와'],
        ['친구', '과', '와'],
    ]
        .forEach(([word, pp, result]) => {
            test(`${word} to ${result}`, () => {
                expect(getKrPp(word, pp)).toBe(result);
            });
        });

})
