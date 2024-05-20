export default `
# dynamic()

> @js-dot/dynamic

Do you want something run after variable when changed?

"""js

const a = dynamic(0);
const b = dynamic(0);

compose(function test1(){
    console.log(a());
});

// console display number 0 from \`test1\` function

compose(function test2(){
    console.log(a() + b())
});

// console display number 0 from \`test2\` function

a(1);

// console display number 1 from \`test1\` function
// console display number 1 from \`test2\` function

b(1);

// console display number 2 from \`test2\` function
"""
`