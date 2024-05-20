import {toBoolean} from './to-boolean';

describe('toBoolean', () => {
    test('return "true" to true', () => {
        expect(toBoolean('true')).toBe(true)
    })

    test('return "false" to false', () => {
        expect(toBoolean('false')).toBe(false)
    })

    test('return "1" to true', () => {
        expect(toBoolean('1')).toBe(true)
    })

    test('return "0" to false', () => {
        expect(toBoolean('0')).toBe(false)
    })

    test('return 1 to true', () => {
        expect(toBoolean(1)).toBe(true)
    })

    test('return 0 to false', () => {
        expect(toBoolean(0)).toBe(false)
    })

    test('return -1 to false', () => {
        expect(toBoolean(-1)).toBe(false)
    })

    test('return null to false', () => {
        expect(toBoolean(null)).toBe(false)
    })

    test('return undefined to false', () => {
        expect(toBoolean(undefined)).toBe(false)
    })

    test('return function to true', () => {
        expect(toBoolean(() => {
        })).toBe(true)
    })

    test('return [1] to false', () => {
        expect(toBoolean([1])).toBe(true)
    })

    test('return [] to false', () => {
        expect(toBoolean([])).toBe(false)
    })

    test('return {foo:null} to false', () => {
        expect(toBoolean({foo: null})).toBe(true)
    })

    test('return {} to false', () => {
        expect(toBoolean({})).toBe(false)
    })
})
