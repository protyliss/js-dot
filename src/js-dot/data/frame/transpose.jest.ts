import {transpose} from './transpose';

describe('transpose', () => {
    test('default', () => {

        expect(
            transpose([
                [1, 2, 3],
                [11, 22, 33],
                [111, 222, 333]
            ])
        )
            .toStrictEqual([
                [1, 11, 111],
                [2, 22, 222],
                [3, 33, 333]
            ]);
    });
});
