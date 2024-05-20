import {toNest} from './to-nest';

describe('toNest', () => {

	const primaryParentResult = [
		{
			no: 1,
			parent: 0,
			arrange: 100,
			children: [
				{
					no: 2,
					parent: 1,
					arrange: 110,
					children: [
						{
							no: 3,
							parent: 2,
							arrange: 111,
							children: []
						}
					]
				}
			]
		}
	];

	it('primary + parent', () => {

		const items = [
			{no: 1, parent: 0, arrange: 100},
			{no: 2, parent: 1, arrange: 110},
			{no: 3, parent: 2, arrange: 111}
		];

		expect(
			toNest(
				items,
				{
					primary: 'no',
					parent: 'parent'
				}
			)
		)
			.toStrictEqual(primaryParentResult);
	})

	it('primary + parent + sort', () => {

		const items = [
			{no: 3, parent: 2, arrange: 111},
			{no: 2, parent: 1, arrange: 110},
			{no: 1, parent: 0, arrange: 100}
		];

		expect(
			toNest(
				items,
				{
					primary: 'no',
					parent: 'parent',
					sort: 'arrange'
				}
			)
		)
			.toStrictEqual(primaryParentResult);
	})

	const depthResult = [
		{
			no: 1,
			depth: 0,
			arrange: 100,
			children: [
				{
					no: 2,
					depth: 1,
					arrange: 110,
					children: [
						{
							no: 3,
							depth: 2,
							arrange: 111,
							children: []
						}
					]
				}
			]
		}
	]

	it('depth', () => {

		const items = [
			{no: 1, depth: 0, arrange: 100},
			{no: 2, depth: 1, arrange: 110},
			{no: 3, depth: 2, arrange: 111}
		];

		expect(
			toNest(
				items,
				{
					depth: 'depth'
				}
			)
		)
			.toStrictEqual(depthResult);
	});

	it('depth + sort', () => {

		const items = [
			{no: 3, depth: 2, arrange: 111},
			{no: 2, depth: 1, arrange: 110},
			{no: 1, depth: 0, arrange: 100}
		];

		expect(
			toNest(
				items,
				{
					depth: 'depth',
					sort: 'arrange'
				}
			)
		)
			.toStrictEqual(depthResult);
	});

	it('map', () => {
		const items = [
			{no: 1, depth: 0},
			{no: 2, depth: 1}
		];

		expect(
			toNest(
				items,
				{
					depth: 'depth',
					map: (child) => {
						const newChild = child as typeof child & {test: boolean};
						newChild.test = true;
						return newChild;
					}
				}
			)
		)
			.toStrictEqual([
				{
					no: 1,
					depth: 0,
					test: true,
					children: [
						{
							no: 2,
							depth: 1,
							test: true,
							children: []
						}
					]
				}
			])
	});
})