import {Dot, DotGetter, DotSetter} from '@js-dot/query';
import {getNodes} from './get-nodes';

export function $after(nodes): DotSetter {
	nodes = getNodes(nodes);

	return $ => {
		return $.forEach($.length > 1 ? afterManySetter : afterSetter, [nodes]);
	}
}

export function after$(nodes): DotGetter<Dot> {
	nodes = getNodes(nodes);

	return $ => {
		return Dot.from(
			$
				.map($.length > 1 ? afterManyGetter : afterGetter, [nodes])
				.flat()
		)

	}
}

function afterManySetter(nodes) {
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		parentNode.insertBefore(nodes[current].cloneNode(true), this.nextSibling);
	}
}

function afterSetter(nodes) {
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		parentNode.insertBefore(nodes[current], this.nextSibling)
	}
}

function afterManyGetter(nodes) {
	const changes      = [];
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		const node = nodes[current].cloneNode(true);
		parentNode.insertBefore(node, this.nextSibling);
		changes.push(node);
	}

	return changes;
}

function afterGetter(nodes) {
	const changes      = [];
	const {parentNode} = this;
	let current        = nodes.length;
	while (current-- > 0) {
		const node = nodes[current];
		parentNode.insertBefore(node, this.nextSibling)
		changes.push(node);
	}

	return changes;
}
