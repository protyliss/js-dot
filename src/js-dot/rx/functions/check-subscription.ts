import {Subscription} from 'rxjs';

/**
 * Unsubscribe Subscription, If Declared Subscription
 * @param subscription
 * @param newSubscription
 */
export function checkSubscription(subscription: Subscription | Subscription[], newSubscription?: Subscription) {
	if (subscription) {
		if (Array.isArray(subscription)) {
			let current = subscription.length;
			while (current-- > 0) {
				const subscription_ = subscription[current];
				if (subscription_ && typeof subscription['unsubscribe'] === 'function') {
					subscription_.unsubscribe();
				}
			}
		} else {
			subscription.unsubscribe();
		}
	}

	return newSubscription || null;
}
