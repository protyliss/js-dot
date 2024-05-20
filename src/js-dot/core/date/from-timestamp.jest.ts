import {fromTimestamp} from './from-timestamp';
import {getTimezoneTime} from './get-timezone-time';

describe('fromTimestamp', () => {
	const now = new Date;
	const y   = now.getFullYear();
	const m   = (value => value < 10 ? '0' + value : value)(now.getMonth() + 1);
	const tz  = getTimezoneTime();
	[
		// @formatter:off
        ['2021-11-30 11:30:02', '2021-11-30T11:30:02.000'+tz],
        ['2021-11-30 11:30',    '2021-11-30T11:30:00.000'+tz],
        ['2021-11-30 11',       '2021-11-30T11:00:00.000'+tz],
        ['2021-11-30',          '2021-11-30T00:00:00.000'+tz],
        ['11-30',               `${y}-11-30T00:00:00.000`+tz],
        ['30',                  `${y}-${m}-30T00:00:00.000`+tz],
        ['2021/11/30T11:30:02', '2021-11-30T11:30:02.000'+tz],
        ['2021/11/30T11:30',    '2021-11-30T11:30:00.000'+tz],
        ['2021/11/30T11',       '2021-11-30T11:00:00.000'+tz],
        ['2021/11/30',          `2021-11-30T00:00:00.000`+tz],
        ['11/30',               `${y}-11-30T00:00:00.000`+tz],
        ['2021.11.30 11:30:02', '2021-11-30T11:30:02.000'+tz],
        ['2021.11.30 11:30',    '2021-11-30T11:30:00.000'+tz],
        ['2021.11.30 11',       '2021-11-30T11:00:00.000'+tz],
        ['2021.11.30',          `2021-11-30T00:00:00.000`+tz],
        ['11.30',               `${y}-11-30T00:00:00.000`+tz],
        // @formatter:on
	].forEach(([before, after]) => {
		test(before + ' to ' + after, () => {
			expect(
				fromTimestamp(before).getTime()
			).toBe(
				(new Date(after)).getTime()
			);
		});
	});

	it('2023-02-03 20:59:59', () => {
		expect(
			fromTimestamp('2023-02-03 20:59:59.00').getTime()
		)
			.toBe((new Date(2023, 2 - 1, 3, 20, 59, 59, 0)).getTime())
	})
});
