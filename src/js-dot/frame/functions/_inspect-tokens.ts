import {inspectToken} from './_inspect-token';

/**
 * @internal
 */
export function inspectTokens(tokens: any){
	return tokens.map(inspectToken).map(', ');
}