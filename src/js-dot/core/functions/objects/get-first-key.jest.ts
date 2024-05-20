import {getFirstKey} from './get-first-key';

describe('getFirstKey', () => {
	it('default', () => {
		expect(
			getFirstKey({
				foo: 1,
				bar: 2
			})
		)
			.toBe('foo')
	})
});