import {DotGetter, DotSetter} from '@js-dot/query';
import {$css, css$} from '../css';

export function $color(value: string | [number | string, number | string, number | string, (number | string)?]): DotSetter {
	return $ => $.pipe($css({color: value} as any));
}

export function color$(): DotGetter {
	return $ => $.pipe(css$('color'));
}
