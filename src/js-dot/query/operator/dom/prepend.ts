import {DotSetter} from '../../typings/dot-setter';
import {getNodes} from './get-nodes';
import {Dot} from '../../classes/dot';

export function $prepend(nodes): DotSetter {
    nodes = getNodes(nodes);

    return $ => {
        return $.forEach($.length > 1 ? prependManySetter : prependSetter, [nodes]);
    }
}

export function prepend$(nodes): DotSetter {
    nodes = getNodes(nodes);

    return $ => {
        return Dot.from(
            $
                .map($.length > 1 ? prependManyGetter : prependGetter, [nodes])
                .flat()
        )
    }
}

function prependManySetter(nodes) {
    const {childNodes} = this;
    const firstNode = childNodes[0];
    let current = nodes.length;

    if (!firstNode) {
        this.appendChild(nodes[--current]);
    }

    while (current-- > 0) {
        this.insertBefore(nodes[current].cloneNode(true), childNodes[0]);
    }
}

function prependSetter(nodes) {
    const {childNodes} = this;
    const firstNode = childNodes[0];
    let current = nodes.length;

    if (!firstNode) {
        this.appendChild(nodes[--current]);
    }

    while (current-- > 0) {
        this.insertBefore(nodes[current], childNodes[0])
    }
}


function prependManyGetter(this: HTMLElement, nodes) {
    const changes = [];
    const {childNodes, parentNode} = this;
    const firstNode = childNodes[0];
    let current = nodes.length;

    if (!firstNode) {
        const node = nodes[--current];
        this.appendChild(node);
        changes.push(node);
    }

    while (current-- > 0) {
        const node = nodes[current].cloneNode(true);
        this.insertBefore(node, childNodes[0]);
        changes.push(node);
    }
    return changes;
}

function prependGetter(nodes) {
    const changes = [];
    const {childNodes} = this;
    const firstNode = childNodes[0];
    let current = nodes.length;

    if (!firstNode) {
        const node = nodes[--current];
        this.appendChild(node);
        changes.push(node);
    }

    while (current-- > 0) {
        const node = nodes[current];
        this.insertBefore(node, childNodes[0])
        changes.push(node);
    }
    return changes;
}
