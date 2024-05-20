import {Dot} from '../../classes/dot';
import {DotGetter} from '../../typings/dot-getter';

export function find$(selector: string): DotGetter<Dot> {
	return $ => {
		const {nodes}    = $;
		const parents    = nodes.reduce(parentNodeReduceFunction, []);
		const candidates = Dot.query(parents, selector);
		const found      = [];

		let current = candidates.length;
		while (current-- > 0) {
			const node = candidates[current];
			if (nodes.indexOf(node) > -1) {
				found.push(node);
			}
		}

		return new Dot(found);
	};
}

function parentNodeReduceFunction(parentNodes, node) {
	const {parentNode} = node;
	return parentNode && parentNodes.indexOf(parentNode) === -1 ?
		parentNodes.concat([parentNode]) :
		parentNodes;
}
