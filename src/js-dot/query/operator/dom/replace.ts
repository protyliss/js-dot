import {Dot} from '../../classes/dot';
import {DotSetter} from '../../typings/dot-setter';
import {getNodes} from './get-nodes';

export function $replace(nodes): DotSetter {
	nodes = getNodes(nodes);

	return $ => {
		return $.forEach($.length > 1 ? replaceManySetter : replaceSetter, [nodes]);
	}
}

export function replace$(nodes): DotSetter {
	nodes = getNodes(nodes);

	return $ => {
		return Dot.from($
			.map($.length > 1 ? replaceManyGetter : replaceGetter, [nodes])
			.flat()
		);
	}
}


function replaceManySetter(nodes) {
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		parentNode.replaceChild(nodes[current].cloneNode(true), this);
	}
}

function replaceSetter(nodes) {
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		parentNode.replaceChild(nodes[current], this)
	}
}

function replaceManyGetter(nodes) {
	const changes      = [];
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		const node = nodes[current].cloneNode(true);
		parentNode.replaceChild(node, this);
		changes.push(node);
	}

	return changes;
}

function replaceGetter(nodes) {
	const changes      = [];
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		const node = nodes[current];
		parentNode.replaceChild(node, this)
		changes.push(node);
	}

	return changes;
}
