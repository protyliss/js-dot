import {ClassToggle} from './class-toggle';

describe('ClassToggle', () => {
    const {body} = document;
    const {classList} = body;
    const classState = new ClassToggle(body, '_true', '_false');

	it('Set body[className=_true]', () => {
        classState.set(true);
        expect(classList.contains('_true')).toBe(true)
    });

	it('Set body[className=_false]', () => {
        classState.set(false);
        expect(classList.contains('_true')).toBe(false)
        expect(classList.contains('_false')).toBe(true)
    })

    it('Set body[className=]', () => {
        classState.pop();
        expect(classList.contains('_true')).toBe(false)
        expect(classList.contains('_false')).toBe(false)
    })
});
