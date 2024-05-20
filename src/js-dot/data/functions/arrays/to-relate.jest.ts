import {toRelate} from './to-relate';

describe('toRelate', () => {

	it('single relates', () => {
		expect(
			toRelate(
				[
					{no: 1},
					{no: 2}
				],
				[
					{relate: 1},
					{relate: 2}
				],
				{
					primaryProperty: 'no',
					relateProperties: 'relate'
				}
			)
		)
			.toStrictEqual(
				[
					{no: 1, items: [{relate: 1}]},
					{no: 2, items: [{relate: 2}]}
				]
			);
	});

	it('multiple relates', () => {
		const one = {a: 1, b: 2};
		const two = {a: 2, b: 3}

		expect(
			toRelate(
				[
					{no: 1},
					{no: 2},
					{no: 3}
				],
				[
					one,
					two
				],
				{
					primaryProperty: 'no',
					relateProperties: ['a', 'b']
				}
			)
		)
			.toStrictEqual(
				[
					{no: 1, items: [one]},
					{no: 2, items: [one, two]},
					{no: 3, items: [two]}
				]
			)
	});

	it('map', () => {
		expect(
			toRelate(
				[
					{no: 1},
					{no: 2}
				],
				[
					{relate: 1},
					{relate: 2}
				],
				{
					primaryProperty: 'no',
					relateProperties: 'relate',
					map: ((item) => {
						item.relate *= 10;
						return item;
					})
				}
			)
		)
			.toStrictEqual(
				[
					{no: 1, items: [{relate: 10}]},
					{no: 2, items: [{relate: 20}]}
				]
			)
	});
})