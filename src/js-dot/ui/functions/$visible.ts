export function $visible<T extends HTMLElement>(element: HTMLElement): Promise<T> {
	return new Promise<T>(resolve => {
		const observer = new IntersectionObserver(entries => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				observer.disconnect();
				resolve(entry.target as T);
			}
		});
		observer.observe(element);
	});
}