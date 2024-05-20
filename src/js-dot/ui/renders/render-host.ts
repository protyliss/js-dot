import {getHostType, parseUrl} from '@js-dot/core';
import {renderIp4, renderIp6} from './render-ip';

const _HOST_GLUE = /[.:]/

export function renderHost(value: string) {
	let {host, port} = parseUrl(value);

	switch (getHostType(host)) {
		case 'ip4':
			host = renderIp4(host);
			break;
		case 'ip6':
			host = renderIp6(host);
			break;
	}

	return `<span class="host">
${host ? `<span class="domain">${host}</span>` : ''}
${port ? `<span class="port"><span>:</span><var>${port}</var></span>` : ''}
	</span>`
}
