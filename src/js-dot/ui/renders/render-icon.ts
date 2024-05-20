import {isNone} from '@js-dot/core';

const _URL = /^((https?:)?\/\/)|\.{0,2}\//;
const _IMG = /\.(gif|png|jpe?g|svg)/;

export function renderIcon(type: string, label?: number | string) {
	if (!type) {
		return isNone(label) ? '' : '' + label;
	}

	if (_IMG.test(type) || _URL.test(type)) {
		return `
			<span class="icons">
				${label ? `
					<img src="${type}" class="icon-image" alt="${label}">
					${renderIconLabel(label)}
				` : `
					<img src="${type}" class="icon-image">
				`}
			</span>
		`
	}

	const [prefix, suffix] = formalIconType(type);

	return `
		<span class="icons">
			  <i class="${prefix} ${prefix}-${suffix}"></i>
			  ${label ? renderIconLabel(label) : ''}
		</span>
		`;
}

function formalIconType(type) {
	const prefixIndex = type.indexOf(':');
	if (prefixIndex > -1 && type.charAt(prefixIndex + 1) !== '/') {
		return type.split(':');
	}
	return ['icon', type];
}

function renderIconLabel(label: number | string) {
	return `<span class="icon-label">${label}</span>`;
}
