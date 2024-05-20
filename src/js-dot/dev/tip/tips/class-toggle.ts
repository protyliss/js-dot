export default `
Class Toggling

Using ClassSwitch class for Set Class Name with Remove the Previous Class Names!

Ready:

"""js
const bodyClass = new ClassToggle(document.body, 'im-true', 'im-false');
"""

Set true state Class Name

"""js
bodyClass.set(true);
"""
"""html
<body class="im-true">
"""

Set false state Class Name:

"""js
bodyClass.set(false);
"""
"""html
<body class="im-false">
"""
`;
