import {Dot} from '../../classes/dot';
import {child$} from './child$';

describe('Dot Child Operator', () => {

    test(
        'Return Anchor in Section',
        () => {
            document.body.innerHTML = `
                <section>
                    <a>1</a>
                </section>
            `;

            return expect(
                Dot.from('section').pipe(child$('a'))[0].tagName
            )
                .toBe('A')
        }
    )

});
