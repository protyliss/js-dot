import {getValues} from '../functions/get-values';
import {ArrayIteratorBase} from './array-iterator-base';
import {$$filter, $$map} from './iterator-base';

describe('ArrayIteratorBase', () => {
	class X10Iterator extends ArrayIteratorBase<number, number> {
		protected [$$map](item: number) {
			return item * 10;
		}
	}

	class EvenIterator extends ArrayIteratorBase<number, number> {
		protected [$$filter](item: number) {
			return item % 2 === 0
		}
	}

	class EventX10Iterator extends EvenIterator {
		protected [$$map](item: number) {
			return item * 10;
		}
	}

	test('$$filter', () => {
		expect(getValues(new EvenIterator([1, 2, 3]))).toStrictEqual([2]);
	});

	test('$$map', () => {
		expect(getValues(new X10Iterator([1, 2, 3]))).toStrictEqual([10, 20, 30]);
	})

	test('$$filter & $$map', () => {
		expect(getValues(new EventX10Iterator([1, 2, 3]))).toStrictEqual([20]);
	})
})
