import {$opacity, opacity$} from './opacity';
import {Dot} from '../../classes/dot';

describe('Dot Css Operator', () => {

    const {body} = document;

    test('Set body.style.opacity with Integer', () => {
        Dot.body($opacity(0.5));

        return expect(body.style.opacity)
            .toEqual('0.5')
    });

    test('Get body.style.opacity', () => {
        const value = Dot.body(
            $opacity(0.5),
            opacity$()
        );

        return expect([body.style.opacity])
            .toEqual(['0.5'])
    });
});
