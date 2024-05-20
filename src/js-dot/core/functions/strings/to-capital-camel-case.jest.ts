import {toCapitalCamelCase} from './to-capital-camel-case';

describe('toCapitalCamelCase', () => {
    test('Return "camelCase" to "camelCase"', () => {
        expect(toCapitalCamelCase('camelCase')).toBe('CamelCase')
    });

    test('Return "snake_case" to "snakeCase"', () => {
        expect(toCapitalCamelCase('snake_case')).toBe('SnakeCase')
    });

    test('Return "kebab-case" to "kebabCase"', () => {
        expect(toCapitalCamelCase('kebab-case')).toBe('KebabCase')
    });

    test('Return "CapitalCase" to "capitalCase"', () => {
        expect(toCapitalCamelCase('CapitalCase')).toBe('CapitalCase')
    });

    test('Return "space case" to "spaceCase"', () => {
        expect(toCapitalCamelCase('space case')).toBe('SpaceCase')
    });
});
