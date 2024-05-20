import {toCamelCase} from './to-camel-case';

describe('toCamelCase', () => {
    test('Return "camelCase" to "camelCase"', () => {
        expect(toCamelCase('camelCase')).toBe('camelCase')
    });

    test('Return "snake_case" to "snakeCase"', () => {
        expect(toCamelCase('snake_case')).toBe('snakeCase')
    });

    test('Return "kebab-case" to "kebabCase"', () => {
        expect(toCamelCase('kebab-case')).toBe('kebabCase')
    });

    test('Return "CapitalCase" to "capitalCase"', () => {
        expect(toCamelCase('CapitalCase')).toBe('capitalCase')
    });

    test('Return "space case" to "spaceCase"', () => {
        expect(toCamelCase('space case')).toBe('spaceCase')
    });
});
