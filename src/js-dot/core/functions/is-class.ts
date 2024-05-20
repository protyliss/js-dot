export function isClass(target: any): boolean {
	return target?.constructor.toString() === 'class'
		|| target?.prototype?.constructor?.toString() === 'class'
}