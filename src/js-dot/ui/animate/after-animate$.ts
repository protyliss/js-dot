export function afterAnimate$(node: HTMLElement, className: string) {
	return new Promise<void>(resolve => {
		node.onanimationend = () => {
			resolve();
		}

		node.classList.add(className);
		const computedStyle = getComputedStyle(node);
		if (computedStyle['animationName'] === 'none' || computedStyle['animationDuration'] == '0') {
			resolve();
		}
	});
}
