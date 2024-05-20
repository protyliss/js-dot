import {DotGetter, DotSetter} from "@js-dot/query";

/**
 * Add [class]
 * @param classNames
 */
export function $class(...classNames: string[]): DotSetter {
	return $ => $.forEach(classAddSetter, [classNames]);
}

/**
 * Remove [class]
 * @param classNames
 */
export function $$class(...classNames: string[]): DotSetter {
	return $ => $.forEach(classRemoveSetter, [classNames]);
}

/**
 * Get [class]
 */
export function class$(): DotGetter<string[]> {
	return $ => $.reduce(classGetter, []);
}

/**
 * Get [class] contains
 * @param token
 */
export function class$$(token: string): DotGetter<boolean[]> {
	return $ => $.reduce(classContains, [], [token]);
}

function classAddSetter(classNames: string[]) {
	this.classList.add(...classNames);
}

function classRemoveSetter(classNames: string[]) {
	this.classList.remove(...classNames);
}

function classGetter(this: HTMLElement, classNames: string[]) {
	const {classList} = this;
	let current       = classList.length
	if (current) {
		while (current-- > 0) {
			const className = classList.item(current);
			if (classNames.indexOf(className) === -1) {
				classNames[classNames.length] = className;
			}
		}
	}
	return classNames;
}

function classContains(this: HTMLElement, contains: boolean[], token: string) {
	contains[contains.length] = this.classList.contains(token);
	return contains;
}
