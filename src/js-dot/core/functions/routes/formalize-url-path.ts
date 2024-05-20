export function formalizeUrlPath(path: string): string {
	return path.startsWith('/') ?
		path :
		'/' + path;
}