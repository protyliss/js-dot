export default `
# relyify()

> @js-dot/frame

Do you has a some class to \`rely\` in many places?
Want it change to other class?

Make change it all at once using \`relyify\`

"""js
class Foo {
}

class Foo2 {
}

// call \`relyify\` to setup before call \`rely\`
relyify({
    token: Foo,
    class: Foo2
});

// Get a instance of \`Foo2\`
const a = rely(Foo);
"""
`;