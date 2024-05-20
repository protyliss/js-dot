import {multiplePath} from './multiple-path';

describe('multiplePath', () => {
	it('a|b', () => {
		expect(
			multiplePath('a|b')
		).toEqual([
			'a',
			'b'
		]);
	})

	it('a/b|c', () => {
		expect(
			multiplePath('a/b|c')
		).toEqual([
			'a/b',
			'a/c'
		]);
	});

	it('a/b|c/d', () => {
		expect(
			multiplePath('a/b|c/d')
		).toEqual([
			'a/b/d',
			'a/c/d'
		]);
	})

	it('a|b/c|d', () => {
		expect(
			multiplePath('a|b/c|d')
		).toEqual([
			'a/c',
			'a/d',
			'b/c',
			'b/d'
		]);
	})
});