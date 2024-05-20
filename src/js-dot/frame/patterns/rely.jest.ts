import {reliabled, reliably, rely, relyify} from './rely';

class WithoutArguments {
}

class WithArguments {
	constructor(foo: string) {
	}
}

class RecursiveA {
	b = rely(RecursiveB);
}

class RecursiveB {
	a = rely(RecursiveA);
}

relyify({
	token: 'foo',
	class: WithoutArguments
});

describe('rely', () => {

	it('default', () => {
		expect(() => rely(undefined)).toThrow(RangeError);
		expect(() => rely(null)).toThrow(RangeError);
		expect(() => rely(false)).toThrow(RangeError);
		expect(rely(WithoutArguments)).toBe(rely(WithoutArguments));
	});

	it('require argument', () => {
		expect(() => rely(WithArguments)).toThrow(SyntaxError);
	});

	it('recursive', () => {
		expect(() => rely(RecursiveA)).toThrow(SyntaxError);
	});

	it('reliable', () => {
		expect(reliabled('foo')).toBe(true)
		expect(reliabled('bar')).toBe(false);
	})

	it('reliably', () => {
		reliably('foo').then(result => {
			expect(result).toBeInstanceOf(WithoutArguments)
		});

		reliably(WithoutArguments).then(result => {
			expect(result).toBeInstanceOf(WithoutArguments)
		});
	});

	it('multiple tokens', () => {
		relyify({
			token: ['alpha', 'bravo'],
			class: class Test {
				id = Math.random();
			}
		});

		expect(rely('alpha')).toBe(rely('bravo'));
	});
});
