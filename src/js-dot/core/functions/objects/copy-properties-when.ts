import {New} from '@js-dot/core';
import {copyProperties} from './copy-properties';

export function copyPropertiesWhen(target: New, methodName: string) {
	const origin = target.prototype[methodName];

	target.prototype[methodName] = function (...args : any[]){
		return copyProperties(origin.apply(this, args), target);
	}
}