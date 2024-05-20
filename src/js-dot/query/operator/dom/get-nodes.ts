import {Dot} from '../../classes/dot';

export function getNodes(nodes: Dot | HTMLElement | HTMLElement[] | String): HTMLElement[];
export function getNodes(nodes) {
    if (nodes instanceof Dot) {
        return nodes.nodes;
    }

    if (typeof nodes === 'string') {
        return Dot.template(nodes);
    }

    if (!Array.isArray(nodes)) {
        return [nodes]
    }

    return nodes;
}
