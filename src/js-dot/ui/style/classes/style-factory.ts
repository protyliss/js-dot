import {StyleRule, Styles} from './styles';
import {JsStyleRules} from '../interfaces/style';

export interface StyleRuleFactory<T> {
	(...args: T[]): string | JsStyleRules | Array<string | JsStyleRules>;
}

export interface StyleRuleIdFactory<T> {
	(...args: T[]): string;
}

export interface StyleFactoryArguments<T> {
	id?: StyleRuleIdFactory<T>;
	rule: StyleRuleFactory<T>;
}

export class StyleFactory<T = number | string> {
	protected _sheet: Styles;
	protected _store: Record<string, StyleRule> = {};

	protected _idFactory!: StyleRuleIdFactory<T>;
	protected _ruleFactory!: StyleRuleFactory<T>;


	constructor(ruleFactory: StyleRuleFactory<T>);
	constructor(factories: StyleFactoryArguments<T>);
	constructor(factories_or_ruleFactory: StyleRuleFactory<T> | StyleFactoryArguments<T>) {
		let factories = factories_or_ruleFactory;

		if (typeof factories === 'function') {
			factories = {rule: factories};
		}

		this._sheet       = new Styles();
		this._ruleFactory = factories.rule;
		this._idFactory   = factories.id || defaultIdFactory;
	}

	update(...args: T[]) {
		const {_store} = this;
		const id       = this._idFactory(...args);

		let rule = _store[id];

		if (rule) {
			return rule;
		}
		const ruleString = this._ruleFactory(...args)
		rule       = this._sheet.add(ruleString);
		_store[id] = rule;

		return rule;
	}
}

function defaultIdFactory(...args: any[]) {
	return args.join('');
}