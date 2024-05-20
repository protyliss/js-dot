import {random} from '@js-dot/core';

export function tip(tips: Array<() => Promise<{ default: string }>>) {
	return random(tips)()
		.then(({default: content}) => {
			content = content.trim();

			let heading = content.match(/^#[^\n\r]+/)[0];

			if (heading) {
				content = content.substring(heading.length).trim();
				heading = heading.slice(1).trim();
			} else {
				heading = 'Tip';
			}

			return {
				heading,
				content
			}
		});
}
