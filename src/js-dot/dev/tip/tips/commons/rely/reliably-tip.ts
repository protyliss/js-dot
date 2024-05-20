export default `
# reliably()

> @js-dot/frame

Is there some code you want to run after something becomes \`reliable\`?

"""js

// Does not happen anything for now
reliably('foo')
    .then(() => {
        console.log(rely('foo'));
    });

// Does not happen anything for now    
reliably('bar')
    .then(() => {
        console.log(rely('bar'));
    });    
      
relyify({
    token: 'foo',
    value: 'alpha'
});

// Console display string 'alpha'

// Console display string 'alpha' as almost immediately
reliably('foo')
    .then(() => {
        console.log(rely('foo'));
    });
"""
`;