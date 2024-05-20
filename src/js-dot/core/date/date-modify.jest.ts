import {dateModify} from './date-modify';

describe('dateModify', () => {
    test('-1d -2h -3i +1s', () => {
            const date = new Date(2022, 11 - 1, 30, 2, 3, 4);
            const result = new Date(date.getTime());
            result.setDate(result.getDate() - 1);
            result.setHours(result.getHours() - 2);
            result.setMinutes(result.getMinutes() - 3);
            result.setSeconds(result.getSeconds() + 1);

            expect(dateModify('-1d -2h -3i +1s', date).getTime())
                .toBe(result.getTime())
        }
    )
});