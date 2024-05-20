import {isObservable, Subject, takeWhile} from 'rxjs';

/**
 * Synchronize Property Value with Subject or BehaviorSubject
 *
 * @param propertyName
 * @constructor
 */
export function WithSubject(propertyName: string): any {
	// @ts-ignore
	return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
		const subscription = '@withSubjectSubscription_' + propertyKey;

		if (!descriptor) {
			let VALUE;

			function getRootSubject() {
				const subject = test(this[propertyName]);

				if (!this[subscription]) {
					this[subscription] = subject
						.pipe(takeWhile(() => {
							return this[propertyName] && !this[propertyName]?.closed
						}))
						.subscribe(value => {
							if (value !== undefined) {
								VALUE = value;
							}
						});
				}
				return subject;
			}

			function rootSetter(value) {
				const subject = getRootSubject();
				VALUE         = value;
				subject.next(value);
			}

			function rootGetter() {
				getRootSubject();
				return VALUE;
			}

			return {
				set: rootSetter,
				get: rootGetter,
				enumerable: true,
				configurable: true
			}
		}


		const {set: originSetter, get: originGetter} = descriptor;

		function getSubject() {
			const subject = test(this[propertyName]);
			if (!this[subscription]) {
				if (this[propertyName] && !this[propertyName]?.closed) {
					subject.next(originGetter.call(this));

					this[subscription] = subject
						.pipe(takeWhile(() => {
							return this[propertyName] && !this[propertyName]?.closed
						}))
						.subscribe(value => {
							originSetter.call(this, value);
						});
				}
			}
			return subject;
		}

		function descriptorSetter(value) {
			const subject = getSubject.call(this);

			subject.next(
				originGetter.call(this)
			);
		}

		function descriptorGetter() {
			getSubject.call(this);
			return originGetter.call(this);
		}

		descriptor.set = descriptorSetter;
		descriptor.get = descriptorGetter;
	}

	function test(subject) {
		if (!isObservable(subject) || typeof subject['next'] !== 'function') {
			throw new ReferenceError(`${propertyName} is not a Subject or BehaviorSubject`);
		}
		return subject as Subject<any>;
	}
}
