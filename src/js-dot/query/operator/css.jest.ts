import {Dot} from '../classes/dot';
import {$css, css$} from './css';

describe('css', () => {

    const {body} = document;
    test('Set body background color to red', () => {

        Dot.body(
            $css({backgroundColor: 'red'})
        );

        return expect(body.style.backgroundColor).toBe('red');
    });

    test('Get body background color', () => {

        const value = Dot.body(
                $css({backgroundColor: 'red'}),
                css$('backgroundColor')
            );

        return expect(value).toEqual(['red']);
    });
});
