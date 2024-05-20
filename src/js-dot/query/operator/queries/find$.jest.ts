import {find$} from './find$';
import {Dot} from '../../classes/dot';

describe('Dot Find Operator', () => {

    test(
        'Return .target in <a>',
        () => {
            document.body.innerHTML = `
                <a>1</a>
                <a>2</a>
                <a class="target">3</a>
                <b class="target">4</b>
            `;

            return expect(
                Dot.from('a').pipe(find$('.target')).length
            )
                .toBe(1)
        }
    );

});
