import {downgradePropertyDecorator} from '../../functions/downgrade-property-decorator';
import {renamedTo} from '../../functions/renamed-to';
import {syncStorageDecoratorFactory} from './_sync-storage-factory';

/**
 * Synchronize Property Value with sessionStorage
 *
 * @version stage 3
 * @description
 * Do not set Initialize value to property. It will overwrite value of it per reload.
 * Use `defaultValue` option for this case.
 *
 * @example
 * ```js
 * class Foo {
 *  @syncLocal() $$foo;
 *  @syncLocal() $$bar = true;
 * ```
 *
 */
export const syncSession = syncStorageDecoratorFactory(sessionStorage);

/**
 * @alias syncSession
 * @see syncSession
 *
 * @version stage 2
 */
export const SyncSession = downgradePropertyDecorator(syncSession);

/**
 * @version stage 2
 * @deprecated Renamed to SyncSession
 */
export const WithSession = renamedTo('WithSession', SyncSession, 'SyncSession');