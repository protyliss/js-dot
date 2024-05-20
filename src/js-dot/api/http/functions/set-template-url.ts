import {isNone} from '@js-dot/core';

// const _SEGMENT_VAR   = /\/:[^/?#]+|<[^>]+>|{[^}]+}/g;
const _SEARCH_STRING = /[?&][^&#]+/g


/**
 * Set Template Url Variables
 * @example
 * ```js
 * // /foo
 * setTemplateUrl('/:path', {path: 'foo'});

 * // ?foo=1&bar=2&baz
 * setTemplateUrl('?foo&bar=2&baz', {$foo: 1});
 * ```
 * @param templateUrl
 * @param parameters
 */
export function setTemplateUrl(templateUrl: string, parameters = {}) {
	switch (typeof parameters) {
		case 'string':
		case 'number':
			throw new ReferenceError('Argument parameters should be object type');
	}

	if (!parameters) {
		parameters = {};
	}

	const defaultSearchStrings = templateUrl.match(/[?&][^=&#]+=[^&#]+/g);

	if (defaultSearchStrings) {
		let current = defaultSearchStrings.length;
		while (current-- > 0) {
			const searchString = defaultSearchStrings[current].split('=');
			const name         = '$' + (searchString.shift() as string).slice(1);

			if (isNone(parameters[name])) {
				parameters[name] = searchString.join('=');
			}
		}
	}

	let templatedUrl    = templateUrl.replace(_SEARCH_STRING, '')
	const searchStrings = [];

	for (const key in parameters) {
		if (parameters.hasOwnProperty(key) && key.startsWith('$')) {
			const value = parameters[key];
			if (!isNone(value)) {
				searchStrings[searchStrings.length] = key.slice(1) + '=' + value;
			}
		}
	}

	const pathVariables = templatedUrl.match(/(?::\??([^/]+)|<([^>]+)>|{([^}]+)})/g);
	if (pathVariables) {
		let current = pathVariables.length;
		while (current-- > 0) {
			const variable = pathVariables [current];
			const key      = variable[0] === ':' ?
				variable[1] === '?' ?
					variable.slice(2) :
					variable.slice(1) :
				variable.substring(1, variable.length - 1);

			if (parameters.hasOwnProperty(key)) {
				const value = parameters[key];
				if (value) {
					templatedUrl = templatedUrl.replace(
						variable,
						value
					);
				} else {
					throw new RangeError(`Property ${key} of Argument parameters is required.`);
				}
			}
		}
	}

	if (searchStrings.length) {
		templatedUrl += (templatedUrl.indexOf('?') < 0 ? '?' : '&') + searchStrings.join('&');
	}

	return templatedUrl;
}

// function segmentRegExp(key: string) {
// 	return segmentRegExp[key] || (
// 		segmentRegExp[key] = new RegExp(`:\\??${key}|<${key}>|\{${key}\}`)
// 	);
// }
