import {$tag} from './$tag';

describe('tag', () => {
    test('`div`, `span`, ``', () => {
        expect($tag('div').tagName).toBe('DIV');
        expect($tag('span').tagName).toBe('SPAN');
        expect($tag().tagName).toBe('DIV');
    });

    test('#id', () => {
        expect($tag('div', '#id').id).toBe('id');
    });

    test('.class', () => {
        expect($tag('div', '.class').className).toBe('class');
    });

    test('class', () => {
        expect($tag('div', 'class').className).toBe('class');
    });

    test('{name}', () => {
        expect($tag('div', {name: 'name'}).name).toBe('name');
    });
});
