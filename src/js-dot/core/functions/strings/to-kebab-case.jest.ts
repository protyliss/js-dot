import {toKebabCase} from './to-kebab-case';

describe('toKebabCase', () => {
    test('Return "camelCase" to "camel-case"', () => {
        expect(toKebabCase('camelCase')).toBe('camel-case')
    });

    test('Return "snake_case" to "snake-case"', () => {
        expect(toKebabCase('snake_case')).toBe('snake-case')
    });

    test('Return "kebab-case" to "kebab-case"', () => {
        expect(toKebabCase('kebab-case')).toBe('kebab-case')
    });

    test('Return "CapitalCase" to "capital-case"', () => {
        expect(toKebabCase('CapitalCase')).toBe('capital-case')
    });

    test('Return "space case" to "space-case"', () => {
        expect(toKebabCase('space case')).toBe('space-case')
    });
});
