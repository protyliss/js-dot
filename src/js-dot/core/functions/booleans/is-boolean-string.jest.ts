import {isBooleanString} from './is-boolean-string';

describe('isBooleanString', () => {
    test('return "true" to true', () =>{
        expect(isBooleanString('true')).toBe(true)
    })

    test('return "false" to true', () =>{
        expect(isBooleanString('false')).toBe(true)
    })

    test('return "foo" to false', () =>{
        expect(isBooleanString('foo')).toBe(false)
    })
})
