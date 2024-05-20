import {RelyifyOption} from './relyify-option';

/**
 * Reliable decorator option
 * @group rely-ify
 */
export interface ReliableOption extends Pick<RelyifyOption, 'token' | 'override'> {
	/**
	 * @default true
	 */
	selfTokenize?: boolean;
}