import {setTemplateUrl} from './set-template-url';

describe('setTemplateUrl', () => {

    test('/:a/:b/:c to /foo/bar/bas', () => {
        expect(
            setTemplateUrl(
                '/:a/:b/:c',
                {
                    a: 'foo',
                    b: 'bar',
                    c: 'baz'
                }
            )
        )
            .toBe('/foo/bar/baz')
    })

    test('?x&y&z to ?x=foo&y=bar&z=baz', () => {
        expect(
            setTemplateUrl(
                '?x&y&z',
                {
                    $x: 'foo',
                    $y: 'bar',
                    $z: 'baz'
                }
            )
        )
            .toBe('?x=foo&y=bar&z=baz')
    })

    test('/:a?x&y&z=baz to /foo?x=bar&z=baz', () => {
        expect(
            setTemplateUrl(
                '/:a?x&y&z=baz',
                {
                    a: 'foo',
                    $x: 'bar'
                }
            )
        )
            .toBe('/foo?x=bar&z=baz')
    });

    test('same slug', () => {
        expect(
            setTemplateUrl(
                '/a/:a',
                {
                    a: 1
                }
            )
        )
            .toBe('/a/1')
    })
});
