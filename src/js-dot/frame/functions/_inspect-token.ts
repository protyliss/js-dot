import {RelyToken} from '../patterns/rely';

/**
 * @internal
 */
export function inspectToken(token: any) {
	switch (token) {
		case undefined:
		case null:
			return token + '';
	}
	const type = typeof token;
	switch (type) {
		case 'boolean':
			return `Boolean<${token}>`;
		case 'number':
			return `Number<${token}>`;
		case 'string':
			return `String<${token}>`;
	}

	if (token instanceof RelyToken) {
		return token.toString();
	}

	if (token.constructor === Function) {
		return `${token.name}`;
	}

	return token;
}