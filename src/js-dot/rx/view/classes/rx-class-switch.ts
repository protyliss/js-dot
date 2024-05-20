import {checkSubscription} from '@js-dot/rx';
import {ClassSwitch} from '@js-dot/ui';
import {Observable, Subscription} from 'rxjs';

/**
 * ClassSwitch with Observable
 * @inheritDoc ClassState
 */
export class RxClassSwitch extends ClassSwitch {
	protected _subscription: Subscription;

	override set(className: string | Observable<string>) {
		if (!(className instanceof Observable)) {
			return super.set(className);
		}

		this._subscription = checkSubscription(
			this._subscription,
			className.subscribe(
				className => {
					if (this._classList) {
						this._set(className);
					} else {
						this._subscription.unsubscribe();
					}
				}
			)
		);

		return this;
	}

	// protected override _set(classNames: string | string[]) {
	// 	const {_prefix, _lastClassName, _classList} = this;
	//
	// 	const prefix = _prefix ? _prefix : '';
	//
	// 	classNames = Array.isArray(classNames) ?
	// 		prefix + classNames.join(prefix + ' ') :
	// 		prefix + classNames;
	//
	// 	this.pop();
	// 	this._lastClassName = classNames;
	//
	// 	if (!classNames) {
	// 		return this;
	// 	}
	//
	// 	_classList.add(...classNames.split(' '));
	//
	// 	return this;
	// }
	// override pop() {
	// 	if (!this._lastClassName) {
	// 		return;
	// 	}
	//
	// 	this._classList.remove(...this._lastClassName.split(' '));
	// }
}
