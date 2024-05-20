export default `
Class Switching

Using ClassSwitch class for Set Class Name with Remove the Previous Class Names!

Ready:

"""js
const bodyClass = new ClassSwitch(document.body);
"""

Set 'a' and 'b':

"""js
bodyClass.set('a', 'b');
"""
"""html
<body class="a b">
"""

Set 'c':

"""js
bodyClass.set('c');
"""
"""html
<body class="c">
"""
`;
