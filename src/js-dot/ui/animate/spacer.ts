import {$remove, $tag} from '@js-dot/ui';
import {afterAnimate$} from './after-animate$';
import {keyframes, Styles} from '@js-dot/ui/style';

function getSpacer(node: HTMLElement) {
	const styles = new Styles();
	const emptySpace = {
		width: 0,
		height: 0
	};

	styles.add({
		__ADD_SPACE: keyframes({
			from: emptySpace
		}),
		__REMOVE_SPACE: keyframes({
			to: emptySpace
		}),
		'.__add_space': {
			animationName: '__ADD_SPACE',
			animationDuration: '0.12s'
		},
		'.__remove_space': {
			animationName: '__REMOVE_SPACE',
			animationDuration: '0.12s'
		}
	});

	// @ts-ignore
	return (getSpacer = function (node) {
		const sizer = $tag('div', {
			style: {
				width: node.offsetWidth + 'px',
				height: node.offsetHeight + 'px'
			}
		});

		node.parentNode.insertBefore(sizer, node.nextSibling)
		return sizer;
	}).apply(this, arguments);
}

export function addSpace$(node: HTMLElement) {
	const spacer = getSpacer(node);

	node.style.display = 'none';

	return afterAnimate$(spacer, '__add_space')
		.then(() => {
			$remove(spacer);
			node.style.display = 'inherit';
		})
}

export function removeSpace$(node: HTMLElement) {
	const spacer = getSpacer(node);

	$remove(node);

	return afterAnimate$(spacer, '__remove_space')
		.then(() => {
			return $remove(spacer);
		})
}

export function addSpace(node: HTMLElement) {
	addSpace$(node).then();
}

export function removeSpace(node: HTMLElement) {
	removeSpace$(node).then();
}
