export function movedTo<T extends (...args: any[]) => any>(method: T, name?: string) {
	if(!name) {
		if (!('name' in method)) {
			throw new SyntaxError('Cannot get a name from method, enter the name to argument');
		}

		name = method.name;
	}

	return function movedToWrap(...args: any[]): ReturnType<T> {
		try {
			throw new SyntaxError(`${name} is moved to other path, check the comment for figure it.`);
		} catch (reason) {
			console.error(reason);
		}
		return method.apply(this, args);
	}
}
