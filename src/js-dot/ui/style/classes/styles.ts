import {JsStyleRules, StyleProperties} from '../interfaces/style';
import {$rule} from '../functions/$rule';

export class Styles {
	protected _rules: StyleRule[] = [];

	style: HTMLStyleElement;
	sheet: CSSStyleSheet;

	constructor(container?: HTMLElement) {
		const style = document.createElement('style');
		style.setAttribute('data-dot', this.constructor.name);

		(container || document.head).append(style);

		this.style = style;
		this.sheet = style.sheet;
	}

	add(rules: string | JsStyleRules | Array<string | JsStyleRules>, index?: number): StyleRule
	add(selector: string, properties: StyleProperties, index?: number): StyleRule;
	add(rules_or_selector, index_or_properties, index?: number) {
		let rules = rules_or_selector;

		if (typeof rules === 'string' && typeof index_or_properties === 'object') {
			rules = [
				{
					[rules]: index_or_properties
				}
			]
		} else if (!Array.isArray(rules)) {
			rules = [rules];
		}

		const {sheet, _rules} = this;

		if (index === undefined) {
			index = sheet.cssRules.length;
		}

		const end = rules.length;
		let current = -1;
		let currentIndex = index;
		while (++current < end) {
			const rule = rules[current];
			if (typeof rule === 'string') {
				sheet.insertRule(
					rule,
					currentIndex++
				)
				continue;
			}

			for (let selector in rule) {
				const target = rule[selector];

				sheet.insertRule(
					typeof target['toRule'] === 'function' ?
						target.toRule(selector) :
						$rule(selector, target),
					currentIndex++
				)
			}
		}

		// increase index after rules
		current = _rules.length;
		while (current-- > index) {
			_rules[current].from++;
		}

		const rule = new StyleRule(this, index);
		_rules[_rules.length] = rule;

		return rule;
	}

	remove(index) {
		const {_rules} = this;

		this.sheet.deleteRule(_rules.splice(index, 1)[0].from);


		let current = _rules.length;
		while (--current >= index) {
			_rules[current].from--;
		}

		return this;
	}

	reset() {
		const {sheet} = this;
		const {cssRules} = sheet;
		let current = cssRules.length;
		while (current-- > 0) {
			sheet.deleteRule(current);
		}

		this._rules = [];

		return this;
	}

	destroy() {
		const {style} = this;
		style.parentNode.removeChild(style);

		return this;
	}
}

export class StyleRule {
	private _sheet: Styles;
	from: number;
	to: number;

	constructor(sheet: Styles, from: number, to?: number) {
		this._sheet = sheet;
		this.from = from;
		this.to = to || from + 1;
	}

	remove() {
		const {_sheet, from, to} = this;
		let current = from - 1;
		while (++current < to) {
			// todo: need to test
			_sheet.remove(current);
		}
	}
}
