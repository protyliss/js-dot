import {_FULL_IP6, _IP4, _SHORTEN_IP6} from '../../constants/regex';

export function getHostType(host: string): 'ip4' | 'ip6' | 'domain' {
	if (_IP4.test(host)) {
		return 'ip4';
	}

	if (_SHORTEN_IP6.test(host) || _FULL_IP6.test(host)) {
		return 'ip6';
	}

	return 'domain';
}
