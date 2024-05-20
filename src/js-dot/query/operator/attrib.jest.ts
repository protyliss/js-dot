import {Dot} from '../classes/dot';
import {$attrib, attrib$} from './attrib';

describe('attrib', () => {
    test('Set body[name]', () => {

        Dot.from(document.body)
            .pipe(
                $attrib('name', 'target-name')
            );

        return expect(
            document.body.getAttribute('name')
        )
            .toBe(
                'target-name'
            );
    });

    test('Get body[name]', () => {
        return expect(
            [document.body.getAttribute('name')]
        )
            .toEqual(
                Dot.from(document.body).pipe(attrib$('name'))
            )
    })
});
