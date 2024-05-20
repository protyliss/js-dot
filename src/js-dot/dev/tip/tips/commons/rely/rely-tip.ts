export default `
# rely

> @js-dot/frame

Need to singleton pattern?, try use to 'rely'

"""js
class Foo {
}

const foo1 = rely(Foo);
const foo2 = rely(Foo);

if(foo1 === foo2){
    console.debug('foo1 and foo2 is same instance!');
}
"""
`;