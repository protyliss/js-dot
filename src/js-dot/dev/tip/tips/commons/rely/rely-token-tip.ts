export default `
# RelyToken

Something may have optional way to 'can rely' or 'cannot rely'.
If it in 'cannot rely', the code does not import it for optimize, so typings are required for the return type.

Please refer to the examples below.

## Without RelyToken

foo.ts:
~~~ts
relyify({
	token: 'foo',
	class: class implements FooInterface {
	}
});
~~~

a.ts :
~~~ts
import {reliabled, rely} from '@js-dot/frame';
import type {FooInterface} from './foo';

if(reliabled('foo')){
	const foo = rely<FooInterface>('foo');
}
~~~

Unable to infer the 'foo' interface, so generic typing is necessary.

b.ts :
~~~ts
import {reliabled, rely} from '@js-dot/frame';
import type {FooInterface} from './foo';

if(reliabled('foo')){
	const foo = rely<FooInterface>('foo');
}
~~~

Uncomfortable of the same process.


## With RelyToken

foo.ts:
~~~ts
export const FOO = new RelyToken<FooInterface>('foo');

relyify({
	token: FOO,
	class: class implements FooInterface {
	}
});
~~~

Make Token with interface.

a.ts:
~~~ts
import {FOO} from './foo';

if(FOO.reliabed){
	const foo = FOO.rely
}
~~~

The 'import' lines have been reduced.

b.ts:
~~~ts
import {FOO} from './foo';

if(FOO.reliabed){
	const foo = FOO.rely
}
~~~

Codes were certainly streamlined.
`;