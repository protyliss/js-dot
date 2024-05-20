import {expect, test} from 'bun:test';
import {getValues} from '../functions/get-values';
import {$$map} from './iterator-base';
import {ObjectEntriesIteratorBase} from './object-entries-iterator-base';

class ArrayifyValuesIterator extends ObjectEntriesIteratorBase<Record<string, string>, [string, string[]]> {
	protected [$$map]([key, item]): [string, string[]] {
		return [key, item.split('')];
	}
}

test('ArrayValuesIterator', () => {
	expect(
		getValues(
			new ArrayifyValuesIterator({
				foo: 'foo',
				bar: 'bar'
			})
		)
	)
		.toStrictEqual([
			['foo', ['f', 'o', 'o']],
			['bar', ['b', 'a', 'r']]
		])
});
