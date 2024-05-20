import {toWrapString} from '@js-dot/core';

export function renderIp(ip: string) {
	return ip ?
		ip.indexOf(':') > -1 ?
			renderIp6(ip) :
			renderIp4(ip) :
		ip;
}

export function renderIp4(ip: string) {
	const segments = ip.split('.');
	return toWrapString(
		segments,
		{
			firstStarts: '<span class="ip ip4">',
			starts: `<var>`,
			ends: `</var>`,
			separator: '<span>.</span>',
			lastEnds: '</span>'
		}
	);
}

export function renderIp6(ip: string) {
	const segments = ip.split(':');
	let current    = segments.length;
	while (current-- > 0) {
		segments[current] = segments[current].replace(/^0+/, '');
	}
	return toWrapString(
		segments,
		{
			firstStarts: '<span class="ip ip6">',
			starts: '<var>',
			ends: '</var>',
			separator: '<span>:</span>',
			lastEnds: '</span>'
		}
	);
}
