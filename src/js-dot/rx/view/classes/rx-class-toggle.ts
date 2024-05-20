import {checkSubscription} from '@js-dot/rx';
import {ClassToggle} from '@js-dot/ui';
import {Observable, Subscription} from 'rxjs';

/**
 * ClassToggle with Observable
 * @inheritDoc
 */
export class RxClassToggle extends ClassToggle {

	protected _subscription: Subscription;

	override set(flag: boolean | Observable<boolean> = false) {
		if (flag instanceof Observable) {
			this._subscription = checkSubscription(
				this._subscription,
				flag.subscribe(flag_ => {
					if (this._classList) {
						this.enable(flag_);
					} else {
						this._subscription.unsubscribe();
					}
				})
			);

			return this;
		}

		return super.set(flag);
	}
}
