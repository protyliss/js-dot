import {WeakIds} from './weak-id';

export abstract class WeakIdBase {
	protected _ids: WeakIds;

	constructor(ids = new WeakIds()) {
		this._ids = ids;
	}
}
