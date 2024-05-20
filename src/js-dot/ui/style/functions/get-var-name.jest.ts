import {getVarName} from './get-var-name';

describe('getVarName', () => {
	it('camelCase', () => {
		expect(
			getVarName('fooBar')
		)
			.toBe('--foo-bar');
	});

	it('kebab-case', () => {
		expect(
			getVarName('foo-bar')
		)
			.toBe('--foo-bar');
	});

	it('--kebab-case', () => {
		expect(
			getVarName('--foo-bar')
		)
			.toBe('--foo-bar');
	});
});