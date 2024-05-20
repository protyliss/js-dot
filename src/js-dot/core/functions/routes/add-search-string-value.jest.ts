import {addSearchStringValue} from './add-search-string-value';

describe('addSearchStringValue', () => {
	it('without ?', () => {
		expect(
			addSearchStringValue(
				'path/to',
				'test=1'
			)
		)
			.toBe('path/to?test=1')
	})

	it('with ?', () => {
		expect(
			addSearchStringValue(
				'path/to?foo=1',
				'test=1'
			)
		)
			.toBe('path/to?foo=1&test=1')
	})
})