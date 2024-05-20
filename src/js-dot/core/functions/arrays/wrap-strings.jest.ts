import {fromWrapString, toWrapString} from './wrap-strings';

describe('toWrapString, fromWrapString', () => {
	const items = ['foo', 'bar'];

	it('Double Quote', () => {
		expect(
			toWrapString(items, {starts: '"', ends: '"', separator: ', '})
		)
			.toBe('"foo", "bar"')
	});
	;

	it('Double Quote with Grave', () => {
		expect(
			toWrapString(items, {firstStarts: '`', lastEnds: '`', starts: '"', ends: '"', separator: ', '})
		)
			.toBe('`"foo", "bar"`')
	});

	it('Tag', () => {
		expect(
			toWrapString(items, {firstStarts: '<em>', lastEnds: '</em>', starts: '<i>', ends: '</i>', separator: ', '})
		)
			.toBe('<em><i>foo</i>, <i>bar</i></em>')
	});

	it('Pipe', () => {
		expect(
			toWrapString(items, {firstStarts: '|', separator: '|', lastEnds: '|'})
		)
			.toBe('|foo|bar|')
	});

	it('|foo||bar|', () => {
		expect(
			fromWrapString('|foo||bar|', '|')
		)
			.toStrictEqual(["foo", "bar"]);
	});

	it('"foo","bar" unwrap', () => {
		expect(
			fromWrapString(
				'"foo", "bar"',
				'"',
				'"',
				', '
			)
		).toStrictEqual(["foo", "bar"])
	});
});
