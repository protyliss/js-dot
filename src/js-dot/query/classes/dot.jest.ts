import {Dot} from './dot';

describe('Dot', () => {
    test(
        'Instance has 1 Node',
        () => expect(Dot.from(window).length).toBe(1)
    );

    test(
        'Instance has 2 Nodes',
        () => expect(Dot.from([window, document]).length).toBe(2)
    );

    test(
        'Instance has 1 Node with select in parent',
        () => {
            document.body.innerHTML = `
                <a>1</a>
                <a>2</a>
                <section>
                    <a>3</a>
                </section>
            `;

            return expect(
                Dot.from(Dot.from('section'), 'a').length
            ).toBe(1);
        }
    );

    test(
        'Window Instance has Window Node',
        () => expect(Dot.from(window).nodes[0]).toBe(window)
    );

    test(
        'Return Same Instance when Same Selector using by literal constructor',
        () => expect(Dot.from(document)).toEqual(Dot.from(document))
    );

    test(
        'Return Same Instance when Using same selector as Node',
        () => {
            document.body.innerHTML = `<div id="target"></div>`;
            const $target = Dot.from('#target');
            return expect($target).toEqual(Dot.from($target[0]));
        }
    );

    test(
        'Return Same Instance when Same Preset Instance',
        () => expect(Dot.document()).toBe(Dot.document())
    );

    test(
        'Return Same Instance when Preset Instance and Single Selector as same with Itself',
        () => expect(Dot.document()).toEqual(Dot.from(document))
    );
});
