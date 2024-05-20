import {getArray} from './get-array';

describe('getArray', () => {
	it('fill true', () => {
		expect(
			getArray(3, true)
		)
			.toBe([true, true, true]);
	})
});
