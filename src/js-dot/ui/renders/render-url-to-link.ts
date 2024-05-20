import {_URLS} from '@js-dot/core';

export function renderUrlToLink(content: string){
	return content.replace(_URLS, '<a href="$1" target="_blank">$1</a>');
}