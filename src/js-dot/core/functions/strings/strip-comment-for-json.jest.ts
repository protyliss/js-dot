import {stripCommentForJson} from './strip-comment-for-json';

describe('stripCommentForJson', () => {
    test('default', () => {
        expect(stripCommentForJson(`{
    // foo is foo
    "foo": 1,
    /*
       bar is baz
     */
    "bar": [1, 2, 3],
    /**
     *  baz is baz
     *  // quz too.
     */
    "baz": "baz has // single line comment",
    "quz": "quz has /* multiple line comment */"
}`))
            .toBe(`{
    "foo": 1,
    "bar": [1, 2, 3],
    "baz": "baz has // single line comment",
    "quz": "quz has /* multiple line comment */"
}`)
    });
});