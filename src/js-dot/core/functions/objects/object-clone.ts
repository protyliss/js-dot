/**
 * get clone object
 * @param object
 */
export function objectClone<T extends Object>(object: T): T;
export function objectClone(object) {
	return JSON.parse(JSON.stringify(object));
}
