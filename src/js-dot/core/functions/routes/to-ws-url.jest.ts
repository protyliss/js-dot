import {toWsUrl} from './to-ws-url';

describe('toWsUrl', () => {
    test('Return "ws://localhost" from "localhost"', () => {
        expect(toWsUrl('localhost')).toBe('ws://localhost');
    });

    test('Return "ws://localhost" from "://localhost"', () => {
        expect(toWsUrl('://localhost')).toBe('ws://localhost');
    });

    test('Return "ws://localhost" from "http://localhost"', () => {
        expect(toWsUrl('http://localhost')).toBe('ws://localhost');
    });

    test('Return "wss://localhost" from "https://localhost"', () => {
        expect(toWsUrl('https://localhost')).toBe('wss://localhost');
    });
});
