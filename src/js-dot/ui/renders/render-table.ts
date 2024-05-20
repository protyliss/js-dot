import {toWrapString} from '@js-dot/core';

export interface RenderTableOption {
	headers?: Array<number | string>;
}

export function renderTable(items: Array<any[]>, option?: RenderTableOption) {
	if (!option) {
		option = {}
	}

	const header = toWrapString(
		option?.headers || items.shift(),
		'<th>',
		'</th>'
	);

	const end   = items.length;
	let current = -1;
	let body    = [];
	while (++current < end) {
		body[body.length] = toWrapString(items[current], '<td>', '</td>');
	}

	return `<table><thead><tr>${header}</tr></thead><tbody>${toWrapString(body, '<tr>', '</tr>')}</tbody></table>`;
}
