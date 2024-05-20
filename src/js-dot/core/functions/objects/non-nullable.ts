import {isEmpty} from './is-empty';
import {isObject} from './is-object';

export function nonNullable(target) {
	if (isObject(target)) {
		return Object.keys(target).reduce(objectNonNullableReducer, {...target});
	}
}

export function objectNonNullableReducer(target, key) {
	if (isEmpty(target[key])) {
		delete target[key];
	}
	return target;
}
