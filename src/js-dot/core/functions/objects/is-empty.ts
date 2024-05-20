export function isEmpty(target: string): target is '';
export function isEmpty(target: null): target is null;
export function isEmpty(target: undefined): target is undefined;
export function isEmpty<T extends object>(target: T): [keyof T]['length'] extends 0 ? false : true;
export function isEmpty(target: any): boolean;
export function isEmpty(target) {
	switch (target) {
		case undefined:
		case null:
			return true;
	}

	switch (typeof target) {
		case 'string':
			return !target.length;
		case 'boolean':
			return false;
	}

	if (Array.isArray(target)) {
		return !target.length;
	}

	for (let property in target) {
		return false;
	}

	return true;
}
