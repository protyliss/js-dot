type TagElement<T> = T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLDivElement;
type TagName = keyof HTMLElementTagNameMap;

/**
 * Create HTMLDivElement
 */
export function $tag(): HTMLDivElement;
/**
 * Create HTMLElement
 * @example
 * ```js
 * // <div></div>
 * const div = $tag();
 * ```
 * @param tagName
 */
export function $tag<T extends TagName, U = TagElement<T>>(tagName: T): U;
/**
 * Create HTMLDivElement with Properties
 * @example
 * ```js
 * // <div class="foo"></div>
 * const div = $tag({className: 'foo'});
 * ```
 * @param properties
 */
export function $tag<V = Record<string, any>>(properties: V): HTMLDivElement & V;
/**
 * Create HTMLElement with Properties
 * @example
 * ```js
 * // <span class="foo"></span>
 * const span = $tag('span', {className: 'foo'});
 * ```
 * @param tagName
 * @param properties
 */
export function $tag<T extends TagName, U = TagElement<T>, V = Record<keyof U, any>>(tagName: T, properties: V): U & V;
/**
 * Create HTMLElement with id or className
 * @example
 * ```js
 * // <span class="bar"></span>
 * const span = $tag('span', '.bar');
 * ```
 * @param tagName
 * @param id_or_className
 */
export function $tag<T extends TagName, U = TagElement<T>, V = Record<string, any>>(tagName: T, id_or_className: string): U & V;
/**
 * Create HTMLDivElement with Custom Document
 * @example
 * ```js
 * // <div></div>
 * const div = $tag(inject(DOCUMENT));
 * ```
 * @param document
 */
export function $tag(document: Document): HTMLDivElement;
/**
 * Create HTMLDivElement with Custom Document and Properties
 * @example
 * ```js
 * // <div className="foo"></div>
 * const div = $tag(inject(DOCUMENT), {className: 'foo'});
 * ```
 * @param document
 * @param properties
 */
export function $tag<V = Record<string, any>>(document: Document, properties): HTMLDivElement & V;
/**
 * Create HTMLElement with Custom Document
 * @example
 * ```js
 * // <span></span>
 * const span = $tag(inject(DOCUMENT), 'span');
 * ```
 * @param document
 * @param tagName
 */
export function $tag<T extends TagName, U = TagElement<T>>(document: Document, tagName: T): U;
/**
 * Create HTMLElement with Custom Document and Properties
 * @example
 * ```js
 * // <span class="foo"></span>
 * const span = $tag(inject(DOCUMENT), 'span', {className: 'foo'});
 * ```
 * @param document
 * @param tagName
 * @param properties
 */
export function $tag<T extends TagName, U = TagElement<T>, V = Record<string, any>>(document: Document, tagName: T, properties: V): U & V;

/**
 * Create HTMLElement with Custom Document and id or className
 * @example
 * ```js
 * // <span class="bar"></span>
 * const span = $tag(inject(DOCUMENT), 'span', '.bar');
 * ```
 * @param document
 * @param tagName
 * @param id_or_className
 */
export function $tag<T extends TagName, U = TagElement<T>>(document: Document, tagName: T, id_or_className: string): U;
export function $tag(document_or_tagName_or_properties?, tagName_or_properties?, properties?) {
	let document_ = document_or_tagName_or_properties;
	let tagName = tagName_or_properties

	if (typeof document_ === 'string') {
		properties = tagName;
		tagName = document_;
		document_ = document;
	} else if (typeof document_['createElement'] !== 'function') {
		properties = document_;
		tagName = 'div';
		document_ = document;
	}
	if (typeof tagName !== 'string') {
		properties = tagName;
		tagName = 'div';
	} else if (typeof properties === 'string') {
		// noinspection FallThroughInSwitchStatementJS
		switch (properties.charAt(0)) {
			case '#':
				properties = {
					id: properties.slice(1)
				};
				break;
			case '.':
				properties = properties.slice(1);

			default:
				properties = {
					className: (properties as string).split('.').join(' ')
				};
		}
	}

	const node = document_.createElement(tagName || 'div');

	if (!properties) {
		return node;
	}

	const propertyKeys = Object.keys(properties);
	let propertyCurrent = propertyKeys.length;
	while (propertyCurrent-- > 0) {
		const key = propertyKeys[propertyCurrent];
		const value = properties[key];

		if (typeof value === 'object') {
			const nodeTarget = node[key];
			if (typeof nodeTarget === 'object') {
				const valueKeys = Object.keys(value);
				let valueCurrent = valueKeys.length;
				while (valueCurrent-- > 0) {
					const valueKey = valueKeys[valueCurrent];
					nodeTarget[valueKey] = value[valueKey];
				}
				continue;
			}
		}

		node[key] = value;
	}

	return node as any;
}
