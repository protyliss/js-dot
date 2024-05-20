/***
 * Get Last Child after Append Child to Previous Argument
 * @example
 * ```js
 * // <body> <div> <span> <i> </i> </span> </div> </body>
 * const i = $append(
 * 		document.body,
 * 		$tag(),
 * 		$tag('span'),
 * 		$tag('i')
 * );
 * ```
 * @param parent
 * @param children
 * @return {HTMLElement} the Last Child
 */
export function $append<T extends HTMLElement[]>(parent: HTMLElement, ...children: T): T extends [...any[], infer U] ? U : HTMLElement {
	if (children.length === 0) {
		children[0] = parent;
		parent      = globalThis['document']?.body;
		if (!parent) {
			throw ReferenceError('Cannot Found Document');
		}
	}

	const end   = children.length;
	let current = -1;
	let child;
	while (++current < end) {
		child = children[current];
		parent.appendChild(child);
		parent = child;
	}

	return child;
}
