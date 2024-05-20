import {DateDigitUnits} from './date-digit-units';

describe('DateDigits', () => {
    test('default', () => {
        const digits = new DateDigitUnits(new Date(2022, 11 - 1, 30, 2, 23, 31));

        expect(digits.y).toBe(2022);
        expect(digits.ym).toBe(202211);
        expect(digits.ymd).toBe(20221130);
        expect(digits.ymdh).toBe(2022113002);
        expect(digits.ymdhi).toBe(202211300223);
        expect(digits.ymdhis).toBe(20221130022331);
    });
});