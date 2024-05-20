import {Dot} from '../../classes/dot';
import {DotGetter} from '../../typings/dot-getter';
import {DotSetter} from '../../typings/dot-setter';
import {getNodes} from './get-nodes';

export function $append(nodes): DotSetter {
	nodes = getNodes(nodes);

	return $ => {
		return $.forEach($.length > 1 ? appendManySetter : appendSetter, [nodes]);
	}
}

export function append$(nodes): DotGetter<Dot> {
	nodes = getNodes(nodes);

	return $ => {
		return Dot.from(
			$
				.map($.length > 1 ? appendManyGetter : appendGetter, [nodes])
				.flat()
		);
	};
}


function appendManySetter(nodes) {
	let current = nodes.length;
	while (current-- > 0) {
		this.appendChild(
			nodes[current].cloneNode(true)
		);
	}
}

function appendSetter(nodes) {
	let current = nodes.length;
	while (current-- > 0) {
		this.appendChild(
			nodes[current]
		)
	}
}

function appendManyGetter(nodes) {
	const changes = [];
	let current   = nodes.length;
	while (current-- > 0) {
		const node = nodes[current].cloneNode(true);
		this.appendChild(node);
		changes.push(node);
	}
	return changes;
}

function appendGetter(nodes) {
	const changes = [];
	let current   = nodes.length;
	while (current-- > 0) {
		const node = nodes[current];
		this.appendChild(node);
		changes.push(node);
	}

	return changes;
}
