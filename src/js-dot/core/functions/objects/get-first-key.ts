/**
 * Get First property name of Object
 * @param object
 */
export function getFirstKey(object: object) {
	for (let key in object) {
		if (object.hasOwnProperty(key)) {
			return key;
		}
	}
	return undefined;
}