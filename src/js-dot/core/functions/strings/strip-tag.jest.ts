import {stripTag} from './strip-tag';

describe('stripTag', () => {
	test('single tag', () => {
		expect(stripTag('<b>b</b>')).toBe('b');
	});

	test('multiple depth b and i" to "bi"', () => {
		expect(stripTag('<b>b<i>i</i></b>')).toBe('bi');
	});

	test('self closed br', () => {
		expect(stripTag('<br/>')).toBe('');
	});

	test('self closed br with space', () => {
		expect(stripTag('<br />')).toBe('');
	});

	test('<> in attribute value', () => {
		expect(stripTag('<span title="<Doh!>">Hello</span>')).toBe('Hello');
	})
})
