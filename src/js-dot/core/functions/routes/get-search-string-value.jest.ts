import {getSearchStringValue} from './get-search-string-value';

describe('getQueryValue', () => {
    test('Return "?foo=bar" to "bar"', () => {
        expect(getSearchStringValue('?foo=bar', 'foo')).toBe('bar')
    })

    test('Return "?foo=bar" to null', () => {
        expect(getSearchStringValue('?foo=bar', 'bar')).toBe(null)
    })
})
