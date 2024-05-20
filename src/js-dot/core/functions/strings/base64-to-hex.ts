import {bytesToHex} from '../arrays/bytes-to-hex';
import {base64ToBytes} from './base64-to-bytes';

export function base64ToHex(base64String: string) {
	return bytesToHex(base64ToBytes(base64String));
}