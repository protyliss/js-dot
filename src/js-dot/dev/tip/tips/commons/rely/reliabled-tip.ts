export default `
# reliabled

> @js-dot/frame

Do you want to know if it is possible to use the \`rely\` function?

"""js
relyify({
    token: 'foo',
    value: 1
});


if(reliabled('foo')){
    // 'foo' is possible to rely
}

if(reliabled('bar')){
    // 'bar' is impossible to rely
}
"""
`;
