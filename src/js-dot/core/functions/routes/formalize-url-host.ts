import {isNumber} from '../numbers/is-number';

export function formalizeUrlHost(host_or_port_only: string | number): string;
export function formalizeUrlHost(host_or_port_only) {
	let host = '' + host_or_port_only;

	if (isNumber(host)) {
		host = location.host.split(':')[0] + ':' + host;
	} else if (host.endsWith('/')) {
		host = host.substring(0, host.length - 1);
	}

	if (host.indexOf('//') < 0) {
		host = location.protocol + '//' + host;
	}

	return host;
}
