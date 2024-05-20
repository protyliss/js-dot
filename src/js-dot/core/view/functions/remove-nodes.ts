/**
 * Remove Node from Parent of Itself
 * @param query_or_collection
 */
export function removeNodes(query_or_collection: string | NodeList | Node[]) {
    const nodes = Array.from(
        typeof query_or_collection === 'string' ?
            document.querySelectorAll(query_or_collection) :
            query_or_collection
    );

    let current = nodes.length;
    while (current-- > 0) {
        const node = nodes[current];
        const {parentNode} = node;
        if (parentNode) {
            parentNode.removeChild(node);
        }
    }
}
