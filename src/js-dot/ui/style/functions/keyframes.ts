import {JsStyleRules} from '../interfaces/style';
import {$keyframes} from './$keyframes';

export class Keyframes {
	constructor(protected rules: JsStyleRules) {
	}

	toRule(selector: string) {
		return $keyframes(selector, this.rules);
	}
}

export function keyframes(rules: JsStyleRules) {
	return new Keyframes(rules);
}
