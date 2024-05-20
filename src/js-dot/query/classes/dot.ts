import { DotGetter } from '../typings/dot-getter';
import { DotNode } from '../typings/dot-node';
import { DotNodes } from '../typings/dot-nodes';
import { DotSetter } from '../typings/dot-setter';

let WINDOW;
let DOCUMENT;
let BODY;

export class Dot {
    /**
     * window Pipe
     * @param operators
     */
    static window(...operators) {

    }

    /**
     * document Pipe
     * @param operators
     */
    static document(...operators) {
        return (DOCUMENT || (DOCUMENT = new Dot(document))).pipe(...operators);
    }

    /**
     * document.body pipe
     * @param operators
     */
    static body(...operators) {
        return (BODY || (BODY = new Dot(document.body))).pipe(...operators);
    }

    static from(parents: Dot | DotNode | DotNode[], selector: string): Dot & DotNodes;
    static from(nodes: Dot | DotNode | DotNode[]): Dot & DotNodes;
    static from(selector_or_template: string): Dot & DotNodes;
    static from(parents, selector?) {
        if (!selector) {
            if (parents instanceof Dot) {
                return parents;
            }
            if (typeof parents === 'object' && parents['_dotInstance']) {
                return parents['_dotInstance'];
            }
        }

        return new Dot(parents, selector);
    }

    /**
     * Query Selector with Multiple Parents
     * @param parents
     * @param selector
     */
    static query(parents: Array<Document | Element>, selector: string) {
        let parentsCurrent = parents.length;
        if (parentsCurrent === 1) {
            return Array.from(parents[0].querySelectorAll(selector));
        }

        const nodes = [];
        while (parentsCurrent-- > 0) {
            const selected = parents[parentsCurrent].querySelectorAll(selector);
            let current = selected.length;
            while (current-- > 0) {
                let node = selected[current];

                // unique
                if (nodes.indexOf(node) === -1) {
                    nodes.push(node);
                }
            }
        }
        return nodes;
    }

    static template(templateString: string) {
        const node = document.createElement('template');
        node.innerHTML = templateString;
        return Array.from(node.content.childNodes);
    }

    nodes: DotNode[];
    length = 0;

    constructor(selector_or_template: string);
    constructor(nodes: Dot | DotNode | DotNode[]);
    constructor(parents: Dot | DotNode | DotNode[], selector: string);
    constructor(parents, selector?) {
        if (selector) {
            if (parents instanceof Dot) {
                parents = parents.nodes;
            } else if (!Array.isArray(parents)) {
                parents = [parents];
            }
        } else {
            selector = parents;
            parents = [document];
        }


        const nodes = selector instanceof Dot ?
            selector.nodes :
            typeof selector === 'string' ?
                /<[a-z]+[>]*>/.test(selector) ?
                    Dot.template(selector) :
                    Dot.query(parents, selector) :
                Array.isArray(selector) ?
                    selector :
                    [selector];

        this.nodes = nodes;

        let length = nodes.length;
        if (length === 1) {
            this.length = 1;
            this[0] = nodes[0];
            this[0]['_dotInstance'] = this;
        } else {
            this.length = length;
            while (length-- > 0) {
                this[length] = nodes[length];
            }
        }
    }

    forEach<M extends (this: HTMLElement, index?: number, nodes?: this) => any>(callback: M)
        : this;
    forEach<A extends [any],
        M extends (this: HTMLElement, a: A[0], index?: number, nodes?: this) => any>(callback: M, args: A)
        : this;
    forEach<A extends [any, any],
        M extends (this: HTMLElement, a: A[0], b: A[1], index?: number, nodes?: this) => any>(callback: M, args: A)
        : this;
    forEach<A extends [any, any, any],
        M extends (this: HTMLElement, a: A[0], b: A[1], c: A[2], index?: number, nodes?: this) => any>(callback: M, args: A)
        : this;
    forEach(callback, args = []) {

        const {nodes} = this;
        let current = this.length;
        while (current-- > 0) {
            callback.apply(
                nodes[current],
                args.concat([current, this])
            );
        }

        return this;
    }

    map<M extends (this: HTMLElement, index?: number, nodes?: this) => any>(callback: M)
        : ReturnType<M>[];
    map<A extends [any],
        M extends (this: HTMLElement, a: A[0], index?: number, nodes?: this) => any>(callback: M, args: A)
        : ReturnType<M>[];
    map<A extends [any, any],
        M extends (this: HTMLElement, a: A[0], b: A[1], index?: number, nodes?: this) => any>(callback: M, args: A)
        : ReturnType<M>[];
    map<A extends [any, any, any],
        M extends (this: HTMLElement, a: A[0], b: A[1], c: A[2], index?: number, nodes?: this) => any>(callback: M, args: A)
        : ReturnType<M>[];
    map(callback, args = []) {
        const {nodes} = this;
        let current = this.length;
        const result = [];
        while (current-- > 0) {
            result.push(
                callback.apply(
                    nodes[current],
                    args.concat([current, this])
                )
            );
        }

        return result;
    }

    reduce<T extends any>(callback, initialValue?: T, args = []): T {
        const {nodes} = this;
        let current = this.length;

        let result = initialValue ? initialValue : callback.apply(nodes[--current], nodes[0]);

        while (current-- > 0) {
            result = callback.apply(
                nodes[current],
                [result].concat(args.concat([current, this]))
            )
        }

        return result;
    }

    pipe(...operators: Array<DotSetter | DotGetter>): any;
    pipe(...operators) {
        return operators.reduce((argument, operator) => {
            return operator(argument);
        }, this);
    }
}
