import {afterAnimate$} from './after-animate$';

export function closeAnimate$(node: HTMLElement) {
	return afterAnimate$(node, '_close');
}
