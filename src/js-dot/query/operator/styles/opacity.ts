import {DotGetter, DotSetter} from '@js-dot/query';
import {$css, css$} from '../css';

export function $opacity(value: number): DotSetter {
	return $ => $.pipe($css({opacity: value}));
}

export function opacity$(): DotGetter<number[]> {
	return $ => $.pipe(css$('opacity'));
}
