import {getRelateProtocol} from './get-relate-protocol';

describe('getProtocol', () => {
    test('Return "http" from "localhost"', () => {
        expect(getRelateProtocol('localhost', 'http')).toBe('http')
    });
    
    test('Return "http" from ://localhost"', () => {
        expect(getRelateProtocol('://localhost', 'http')).toBe('http')
    });
    
    test('Return "http" from "http://localhost"', () => {
        expect(getRelateProtocol('http://localhost', 'http')).toBe('http')
    });
    
    test('Return "https" from "https://localhost"', () => {
        expect(getRelateProtocol('https://localhost', 'http')).toBe('https')
    });
    
    test('Return "ws" from "localhost"', () => {
        expect(getRelateProtocol('localhost', 'ws')).toBe('ws')
    });
    
    test('Return "ws" from "://localhost"', () => {
        expect(getRelateProtocol('://localhost', 'ws')).toBe('ws')
    });
    
    test('Return "ws" from "http://localhost"', () => {
        expect(getRelateProtocol('http://localhost', 'ws')).toBe('ws')
    });
    
    test('Return "wss" from "https://localhost"', () => {
        expect(getRelateProtocol('https://localhost', 'ws')).toBe('wss')
    });
})
