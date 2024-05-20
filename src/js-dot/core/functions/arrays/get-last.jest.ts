import {getLast} from './get-last';

describe('getLast', () => {
	it('return end', () => {
		expect(getLast(['first', 'end'])).toBe('end');
	});
});
