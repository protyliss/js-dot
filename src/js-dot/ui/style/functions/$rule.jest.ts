import {$rule} from './$rule';

describe('$rule', () => {
	it('string', () => {
		expect(
			$rule('foo', '{display:none}')
		)
			.toBe(`foo {display:none}`)
	});

	it('object', () => {
		expect(
			$rule('foo', {
				display: 'none'
			})
		)
			.toBe(`foo {
display: none
}`);
	});
})