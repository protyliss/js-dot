import {getPathClass} from './get-path-class';

describe('getPathClass', () => {
    test("/a/1/b to ['path_a', 'path_a_1', 'path_a_any', 'path_a_1_b', 'path_a_any_b']", () => {
        expect(getPathClass('/a/1/b')).toEqual([
            'path_a',
            'path_a_1',
            'path_a_any',
            'path_a_any_b',
            'path_a_1_b',
        ]);
    });

    test("/a/b to ['url-a', 'url-a_b']", () => {
        expect(getPathClass('/a/b', {prefix: 'url', delimiter: '-'})).toEqual([
            'url-a',
            'url-a-b'
        ])
    })
});
