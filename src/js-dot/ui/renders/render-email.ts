export function renderEmail(value: string) {
	if (!value) {
		return value;
	}

	const [account, host] = ('' + value).split('@');

	return [
		'<span class="emails">',
			`<span class="email-account">${account}</span>`,
			'<span class="email-at-host">',
				`<span class="email-at">@</span>`,
				`<span class="email-host">${host}</span>`,
			'</span>',
		'</span>'
	].join('');
}
