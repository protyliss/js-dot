import {ClassSwitch} from './class-switch';

describe('ClassSwitch', () => {
    const {body} = document;
    const {classList} = body;
    const classSwitch = new ClassSwitch(body, {prefix: 'a-'});

    test('Set body[className=a-a]', () => {
        classSwitch.set('a');
        expect(classList.contains('a-a')).toBe(true)
    });

    test('Set body[className=a-b]', () => {
        classSwitch.set('b');
        expect(classList.contains('a-a')).toBe(false)
        expect(classList.contains('a-b')).toBe(true)
    });

    test('Set body[className=]', () => {
        classSwitch.pop();
        expect(classList.contains('a-a')).toBe(false)
        expect(classList.contains('a-b')).toBe(false)
    });
});
