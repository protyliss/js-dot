export function renamedTo<T extends (...args: any[]) => any>(name: string | T, method?: T) {
	return function renamedToWrap(...args: any[]): ReturnType<T> {
		try {
			throw new SyntaxError(`${name} renamed to ${method.name}. ${name} no longer to support as soon.`);
		} catch (reason) {
			console.error(reason);
		}
		return method.apply(this, args);
	}
}
