export default `
# relyify()

> @js-dot/frame

Do you want to \`rely\' on it even if it is not a constructor?
Try using \`relyify\`


\`rely\` anything: 

"""js
relyify({
    token: 'foo',
    value: 'alpha'
});

// foo get a string 'alpha'
const foo = rely('foo');
"""

\`rely\` class instance:

"""js
relyify({
    token: 'bar',
    class: class Bar {
    }
});

// bar get a instance of Bar
const bar = rely('bar');
"""

\`rely\` return of function:

"""js
relyify({
    token: 'baz',
    factory: () => Math.random())
});

// baz get a string 'charlie'
const baz = rely('baz');
"""
`