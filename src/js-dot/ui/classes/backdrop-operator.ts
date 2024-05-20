export interface BackdropInterface {
    show(): void;

    hide(): void;
}

const {createElement} = document;

export function tag(tagName: string): HTMLElement;
export function tag(properties: Partial<HTMLElement>): HTMLElement;
export function tag(tagName: string, properties: Partial<HTMLElement>): HTMLElement;
export function tag(tagName: string | Partial<HTMLElement>, properties?: Partial<HTMLElement>): HTMLElement {
    if (typeof tagName !== 'string') {
        properties = tagName;
        tagName = 'div';
    }
    const element = createElement(tagName as string);
    const keys = Object.keys(properties);
    let current = keys.length;
    while (current-- > 0) {
        const key = keys[current];
        element[key] = properties[key];
    }
    return element;
}

export function append(...tags) {
    const end = tags.length;
    let current = 0;
    while (++current < end) {
        tags[current - 1].appendChild(tags[current]);
    }
    return tags[current - 1];
}

export class BackdropOperator implements BackdropInterface {
    protected _parent: HTMLElement;
    protected _node: HTMLElement;

    constructor(parent?: HTMLElement) {
        this._parent = parent || document.body;


        this._node = append(
            this._parent,
            tag({
                className: 'dot-backdrop'
            })
        );
    }

    show() {

    }

    hide() {

    }
}
