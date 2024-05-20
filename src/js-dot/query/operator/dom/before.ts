import {Dot} from '../../classes/dot';
import {DotGetter} from '../../typings/dot-getter';
import {DotSetter} from '../../typings/dot-setter';
import {getNodes} from './get-nodes';

export function $before(nodes): DotSetter {
	nodes = getNodes(nodes);

	return $ => {
		return $.forEach($.length > 1 ? beforeManySetter : beforeSetter, [nodes]);
	}
}

export function before$(nodes): DotGetter<Dot> {
	nodes = getNodes(nodes);

	return $ => {
		return Dot.from(
			$
				.map($.length > 1 ? beforeManyGetter : beforeGetter, [nodes])
				.flat()
		);
	}
}


function beforeManySetter(nodes) {
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		parentNode.insertBefore(
			nodes[current].cloneNode(true),
			this
		);
	}
}

function beforeSetter(nodes) {
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		parentNode.insertBefore(
			nodes[current],
			this
		)
	}
}

function beforeManyGetter(nodes) {
	const changes      = []
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		const node = nodes[current].cloneNode(true);
		parentNode.insertBefore(node, this);
		changes.push(node);
	}
	return changes;
}

function beforeGetter(nodes) {
	const changes      = []
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		const node = nodes[current];
		parentNode.insertBefore(node, this);
		changes.push(node);
	}
	return changes;
}
