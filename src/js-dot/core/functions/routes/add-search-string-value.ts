export function addSearchStringValue(url: string, searchString: string): string {
	const [path, hash] = url.split('#');

	switch (searchString[0]) {
		case '?':
		case '&':
			searchString = searchString.slice(1);
	}

	return path +
		(path.indexOf('?') > -1 ? '&' : '?') + searchString
		+ (hash ? '#' + hash : '');
}
