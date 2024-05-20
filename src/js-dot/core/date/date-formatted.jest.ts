import {dateFormatted} from './date-formatted';

describe('dateFormatted', () => {
	it('timestamp', () => {
		const now = new Date;
		expect(
			dateFormatted('Y-11-30 H:00:00.0').toISOString()
		)
			.toBe(
				(new Date(now.getFullYear(), 10, 30, now.getHours(), 0, 0, 0)).toISOString()
			)
	});
})