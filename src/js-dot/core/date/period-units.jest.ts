import {PeriodUnits} from './period-units';
import {Period} from './period';

describe('PeriodUnits', () => {
    test('string targets', () => {
        const toBeYear = 'YearTarget';
        const toBeMonth = 'MonthTarget';
        const toBeDay = 'DayTarget';
        const toBeHour = 'HourTarget';
        const toBeMinute = 'MinuteTarget';
        const toBeSecond = 'SecondTarget';

        const periodUnits = new PeriodUnits({
            year: toBeYear,
            month: toBeMonth,
            day: toBeDay,
            hour: toBeHour,
            minute: toBeMinute,
            second: toBeSecond
        });

        const expectYear = periodUnits.auto('20220101~20300101');
        const expectMonth = periodUnits.auto('20220101~20221231');
        const expectDate = periodUnits.auto('20220101~20220131');
        const expectHour = periodUnits.auto('2022010100~2022010123');
        const expectMinute = periodUnits.auto('2022010100~2022010100');
        const expectSecond = periodUnits.auto('202201010000~202201010000');

        expect(expectYear.target).toBe(toBeYear);
        expect(expectMonth.target).toBe(toBeMonth);
        expect(expectDate.target).toBe(toBeDay);
        expect(expectHour.target).toBe(toBeHour);
        expect(expectMinute.target).toBe(toBeMinute);
        expect(expectSecond.target).toBe(toBeSecond);
    });

    test('object targets', () => {
        class toBeYear {
            static test() {
                return false;
            }
        }

        class toBeMonth {
            static test() {
                return false;
            }
        }

        class toBeDay {
            static test() {
                return false;
            }
        }

        class toBeHour {
            static test() {
                return false;
            }
        }

        class toBeMinute {
            static test() {
                return false;
            }
        }

        class toBeSecond {
            static test() {
                return false;
            }
        }

        const periodUnits = new PeriodUnits({
            year: toBeYear,
            month: toBeMonth,
            day: toBeDay,
            hour: toBeHour,
            minute: toBeMinute,
            second: toBeSecond
        });

        const expectYear = periodUnits.auto('20220101~20300101');
        const expectMonth = periodUnits.auto('20220101~20221231');
        const expectDate = periodUnits.auto('20220101~20220131');
        const expectHour = periodUnits.auto('2022010100~2022010123');
        const expectMinute = periodUnits.auto('2022010100~2022010100');
        const expectSecond = periodUnits.auto('202201010000~202201010000');

        expect(expectYear.target).toBe(toBeYear);
        expect(expectMonth.target).toBe(toBeMonth);
        expect(expectDate.target).toBe(toBeDay);
        expect(expectHour.target).toBe(toBeHour);
        expect(expectMinute.target).toBe(toBeMinute);
        expect(expectSecond.target).toBe(toBeSecond);
    });

    test('fallbacks', () => {
        const toBeYear = 'YearTarget';
        // const toBeMonth = 'MonthTarget';
        const toBeDay = 'DayTarget';
        // const toBeHour = 'HourTarget';
        const toBeMinute = 'MinuteTarget';
        const toBeSecond = 'SecondTarget';

        const periodUnits = new PeriodUnits({
            year: toBeYear,
            day: toBeDay,
            minute: toBeMinute,
            second: toBeSecond
        });

        const expectYear = periodUnits.auto('20220101~20300101');
        const expectMonth = periodUnits.auto('20220101~20221231');
        const expectDate = periodUnits.auto('20220101~20220131');
        const expectHour = periodUnits.auto('2022010100~2022010123');
        const expectMinute = periodUnits.auto('2022010100~2022010100');
        const expectSecond = periodUnits.auto('202201010000~202201010000');

        expect(expectYear.target).toBe(toBeYear);
        expect(expectMonth.target).toBe(toBeDay);
        expect(expectDate.target).toBe(toBeDay);
        expect(expectHour.target).toBe(toBeMinute);
        expect(expectMinute.target).toBe(toBeMinute);
        expect(expectSecond.target).toBe(toBeSecond);
    });

    test('get', () => {
        const toBeYear = 'YearTarget';
        const toBeMonth = 'MonthTarget';
        const toBeDay = 'DayTarget';
        const toBeHour = 'HourTarget';
        const toBeMinute = 'MinuteTarget';
        const toBeSecond = 'SecondTarget';

        const periodUnits = new PeriodUnits({
            year: toBeYear,
            month: toBeMonth,
            day: toBeDay,
            hour: toBeHour,
            minute: toBeMinute,
            second: toBeSecond
        });

        const expectYear = periodUnits.get(new Period('20220101~20300101'), 'year');
        const expectMonth = periodUnits.get(new Period('20220101~20221231'), 'month');
        const expectDate = periodUnits.get(new Period('20220101~20220131'), 'day');
        const expectHour = periodUnits.get(new Period('2022010100~2022010123'), 'hour');
        const expectMinute = periodUnits.get(new Period('2022010100~2022010100'), 'minute');
        const expectSecond = periodUnits.get(new Period('202201010000~202201010000'), 'second');

        expect(expectYear.target).toBe(toBeYear);
        expect(expectMonth.target).toBe(toBeMonth);
        expect(expectDate.target).toBe(toBeDay);
        expect(expectHour.target).toBe(toBeHour);
        expect(expectMinute.target).toBe(toBeMinute);
        expect(expectSecond.target).toBe(toBeSecond);
    })
});