import {TalkCallbackListener} from './talk-callback-listener';
import {TalkingWithBase} from './talking-with-base';

export abstract class TalkingWithListenBase<TTypes extends string = string> extends TalkingWithBase {
	protected _talkListeners = new Map<TTypes, ReturnType<this['_talkGetListener']>>();

	_talkGetListener() {
		return TalkCallbackListener;
	}

	listen(type: TTypes) {
		const {_talkListeners: map} = this;

		if (type in map) {
			throw new SyntaxError(`${type} is listening already.`)
		}

		const listener = new (this._talkGetListener())(this, type);

		map.set(type, listener as any);

		return listener;
	}
}