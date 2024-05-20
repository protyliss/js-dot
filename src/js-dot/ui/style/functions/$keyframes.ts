import {JsStyleRules} from '../interfaces/style';
import {$rule} from './$rule';

export function $keyframes(name: string, rules: JsStyleRules) {
	const strings = [];
	for (let time in rules) {
		if (!rules.hasOwnProperty(time)) {
			continue;
		}
		strings[strings.length] = $rule(time, rules[time]);
	}
	return `@keyframes ${name} {
${strings.join('')}
}`;
}
