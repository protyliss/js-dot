export function renamedTo<T extends (...args: any[]) => any>(name: string | T, method?: T, methodName?: string) {
	return function renamedToWrap(...args: any[]): ReturnType<T> {
		try {
			throw new SyntaxError(`${name} renamed to ${methodName || method.name}. ${name} no longer to support as soon.`);
		} catch (reason) {
			console.error(reason);
		}
		return method.apply(this, args);
	}
}
