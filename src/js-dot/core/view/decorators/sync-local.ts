import {renamedTo} from '@js-dot/core';
import {downgradePropertyDecorator} from '../../functions/downgrade-property-decorator';
import {syncStorageDecoratorFactory} from './_sync-storage-factory';

/**
 * Synchronize Property Value with localStorage
 *
 * @description
 * Do not set Initialize value to property. It will overwrite value of it per reload.
 * Use `defaultValue` option for this case.
 *
 * @version stage 3
 *
 * @example
 * ```js
 * class Foo {
 * 	@syncLocal() $$foo;
 *  @syncLocal() $$bar = 1
 * }
 * ```
 */
export const syncLocal = syncStorageDecoratorFactory(localStorage);

/**
 * @alias syncLocal
 * @see syncLocal
 *
 * @version stage 2
 */
export const SyncLocal = downgradePropertyDecorator(syncLocal);

/**
 * @version stage 2
 * @deprecated Renamed to SyncLocal
 */
export const WithLocal = renamedTo('WithLocal', SyncLocal, 'SyncLocal');