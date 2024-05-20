import {StyleProperties} from '../interfaces/style';
import {$properties} from './$properties';

export function $rule(selector: string, properties: StyleProperties) {
	return `${selector} ${$properties(properties)}`;
}