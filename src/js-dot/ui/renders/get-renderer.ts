import {ExpressionType} from '@js-dot/core';
import {renderDate, renderEmail, renderHost, renderIp} from '@js-dot/ui';

export function getRenderer(expressionType: ExpressionType) {
	switch (expressionType) {
		case 'ip':
			return renderIp;
		case 'host':
			return renderHost;
		case 'email':
			return renderEmail;
		case 'timestamp':
			return renderDate;
		case 'numeric':
			return renderNumeric;
	}
}

function renderNumeric(value: number) {
	return value ? value.toLocaleString() : value;
}
