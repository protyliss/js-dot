import {$properties} from './$properties';

describe('$properties', () => {
	test('string', () => {
		expect(
			$properties('{display: none}')
		)
			.toBe('{display: none}');

		expect(
			$properties('display: none')
		)
			.toBe('{display: none}');
	});

	test('string exception', () => {
		expect(
			() => $properties('{display:none')
		)
			.toThrow()

		expect(
			() => $properties('display:none}')
		)
			.toThrow()
	});

	test('object', () => {
		expect(
			$properties({
				backgroundSize: 0
			})
		)
			.toBe(`{
background-size: 0
}`);
	});
});