import {underline} from '@js-dot/dev';

export function h1(headline: string) {
	return underline(headline, '=');
}