import {Dot} from '../classes/dot';
import {$$class, $class, class$, class$$} from './class';

describe('class', () => {

    const {body} = document;
    const $body = Dot.body()

    test('set [class=foo]', () => {
        $body.pipe($class('foo'));

        expect(body.classList.contains('foo')).toBeTruthy();
        expect(body.classList.contains('bar')).toBeFalsy();
    })

    test('get [class]', () => {
        $body.pipe(class$());

        expect(body.className).toBe('foo');
    })

    test('contains [class=foo]', () => {
        expect($body.pipe(class$$('foo'))).toEqual([true])
    })

    test('remove [class=foo]', () => {
        $body.pipe($$class('foo'));

        expect(body.classList.contains('foo')).toBeFalsy();
    })
})
