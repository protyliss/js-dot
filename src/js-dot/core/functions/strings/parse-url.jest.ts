import {ParsedUrl, parseUrl} from './parse-url';

describe('parseUrl', () => {

    const urls: ParsedUrl[] = [
        {
            href: 'http://localhost',
            protocol: 'http:',
            host: 'localhost',
            port: undefined,
            hostname: 'localhost',
            pathname: undefined,
            search: undefined,
            hash: undefined,
            protocolValue: 'http',
            searchValue: undefined,
            hashValue: undefined,
        },
        {
            href: 'https://localhost:80/path/to?search#hash',
            protocol: 'https:',
            host: 'localhost',
            port: '80',
            hostname: 'localhost:80',
            pathname: '/path/to',
            search: '?search',
            hash: '#hash',
            protocolValue: 'https',
            searchValue: 'search',
            hashValue: 'hash',
        },
        {
            href: 'ftp://localhost/path/to',
            protocol: 'ftp:',
            host: 'localhost',
            port: undefined,
            hostname: 'localhost',
            pathname: '/path/to',
            search: undefined,
            hash: undefined,
            protocolValue: 'ftp',
            searchValue: undefined,
            hashValue: undefined,
        },
        {
            href: '/path/to#hash',
            protocol: undefined,
            host: undefined,
            port: undefined,
            hostname: undefined,
            pathname: '/path/to',
            search: undefined,
            hash: '#hash',
            protocolValue: undefined,
            searchValue: undefined,
            hashValue: 'hash',
        },
        {
            href: '../path/to?search',
            protocol: undefined,
            host: undefined,
            port: undefined,
            hostname: undefined,
            pathname: '../path/to',
            search: '?search',
            hash: undefined,
            protocolValue: undefined,
            searchValue: 'search',
            hashValue: undefined,
        },

        {
            href: '?searchOnly',
            protocol: undefined,
            host: undefined,
            port: undefined,
            hostname: undefined,
            pathname: undefined,
            search: '?searchOnly',
            hash: undefined,
            protocolValue: undefined,
            searchValue: 'searchOnly',
            hashValue: undefined,
        }
    ];

    urls.forEach(url => {
        test(url.href, () => {
            expect(parseUrl(url.href)).toStrictEqual(url);
        });
    });

});
