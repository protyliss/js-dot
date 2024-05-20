import {isEmpty} from './is-empty';

export function isFalseLike(target: boolean): target is false;
export function isFalseLike(target: number): target is 0;
export function isFalseLike(target: null): target is null;
export function isFalseLike(target: undefined): target is undefined;
export function isFalseLike(target: any): boolean;
export function isFalseLike(target) {
	return target === false || target === 0 || isEmpty(target);	
}