/**
 * @internal
 */
export function getTimeout(self: object, timeout_or_propertyName: number | string) {
	return typeof timeout_or_propertyName === 'number' ?
		timeout_or_propertyName :
		self[timeout_or_propertyName] || 0;
}