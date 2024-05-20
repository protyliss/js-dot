import {getExpressionTypes} from './get-expression-types';

describe('getExpressionTypes', () => {

    test('1 Object Array Types', () => {
        expect(
            getExpressionTypes([
                {
                    timestamp: Date.now(),
                    ip: '0.0.0.0'
                }
            ])
        )
            .toStrictEqual({
                timestamp: 'timestamp',
                ip: 'ip'
            });
    });

    test('2 Object Array Types', () => {
        expect(
            getExpressionTypes([
                {
                    timestamp: Date.now(),
                    ip: null
                },
                {
                    timestamp: null,
                    ip: '0.0.0.0'
                }
            ])
        )
            .toStrictEqual({
                timestamp: 'timestamp',
                ip: 'ip'
            });
    });
});
