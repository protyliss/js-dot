import {rely} from './rely';

class Foo {
	constructor(a: number, b?: string) {
	}
}

rely(Foo, [1, '1'])
