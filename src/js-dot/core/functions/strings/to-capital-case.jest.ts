import {toCapitalCase} from './to-capital-case';

describe('toCapitalCase', () => {
    test('Return "camelCase" to "camel Case"', () => {
        expect(toCapitalCase('camelCase')).toBe('Camel Case')
    });

    test('Return "snake_case" to "snake Case"', () => {
        expect(toCapitalCase('snake_case')).toBe('Snake Case')
    });

    test('Return "kebab-case" to "kebab Case"', () => {
        expect(toCapitalCase('kebab-case')).toBe('Kebab Case')
    });

    test('Return "Capital Case" to "capital Case"', () => {
        expect(toCapitalCase('CapitalCase')).toBe('Capital Case')
    });

    test('Return "space case" to "Space Case"', () => {
        expect(toCapitalCase('space case')).toBe('Space Case')
    });
});
