import {_URL} from '../../constants/regex';

/**
 * URL like Object
 *
 * @description
 * Parse URL String Like URL Object

 * Not Implemented:
 * - origin
 * - username
 * - password
 * - searchParams
 *
 * Additional Properties:
 * - protocolValue
 * - searchValue
 * - hashValue
 *
 */
export interface ParsedUrl {
	/**
	 * @example
	 * `http:` of `http://hostname:80/path/to?search#hash`
	 */
	protocol: string;

	/**
	 * @example
	 * `hostname:80` of `http://hostname:80/path/to?search#hash`
	 */
	host: string;

	/**
	 * @example
	 * `hostname` of `http://hostname:80/path/to?search#hash`
	 */
	hostname: string;

	/**
	 * @example
	 * http://hostname:80/path/to?search#hash
	 */
	href: string;

	/**
	 * @example
	 * `80` of `http://hostname:80/path/to?search#hash`
	 */
	port: string;

	/**
	 * @example
	 * `/path/to` of `http://hostname:80/path/to?search#hash`
	 */
	pathname: string;

	/**
	 * @example
	 * `?search` of `http://hostname:80/path/to?search#hash`
	 */
	search: string;

	/**
	 * @example
	 * `#hash` of `http://hostname:80/path/to?search#hash`
	 */
	hash: string;

	/**
	 * @example
	 * `http` of `http://hostname:80/path/to?search#hash`
	 */
	protocolValue: string;

	/**
	 * @example
	 * `search` of `http://hostname:80/path/to?search#hash`
	 */
	searchValue: string;

	/**
	 * @example
	 * `hash` of `http://hostname:80/path/to?search#hash`
	 */
	hashValue: string;
}

/***
 * Get URL Like Object from URL String
 * @param url
 */
export function parseUrl(url: string): ParsedUrl {
	if (!url) {
		return {} as ParsedUrl;
	}

	const matched = url.match(_URL);

	if (!matched) {
		return {
			href: url
		} as ParsedUrl;
	}

	const [href, protocol, host, port, pathname, search, hash] = matched;

	return {
		href,
		protocol,
		host,
		port,
		hostname: port ? host + ':' + port : host,
		pathname,
		search,
		hash,
		protocolValue: protocol ? protocol.substring(0, protocol.length - 1) : undefined,
		searchValue: search ? search.slice(1) : undefined,
		hashValue: hash ? hash.slice(1) : undefined
	};
}
