import {getExpressionType} from './get-expression-type';

describe('getExpressionType', () => {
    test('seconds to timestamp', () => {
        expect(getExpressionType(Date.now())).toBe('timestamp');
    });

    test('ISO Date String to timestamp', () => {
        expect(getExpressionType((new Date).toISOString())).toBe('timestamp');
    });

    test('UTC Date String to timestamp', () => {
        expect(getExpressionType((new Date).toUTCString())).toBe('timestamp');
    });

    test('IP String to ip', () => {
        expect(getExpressionType('0.0.0.0')).toBe('ip');
    });
});
