import {TalkListener} from './talk-listener';
import {TalkOperatorBase} from './talk-operator-base';

export abstract class TalkListenBase<TTypes extends string = string> extends TalkOperatorBase {
	protected _talkListeners: Record<TTypes, ReturnType<this['_talkGetListener']>>

	/**
	 * @protected
	 */
	_talkGetListener(){
		return TalkListener;
	}

	listen(type: TTypes){
		const {_talkListeners: map} = this;

		if(type in map){
			throw new SyntaxError(`${type} is listening already.`)
		}

		const listener = new (this._talkGetListener() as any)(this, type);
		map[type as any] = listener;

		return listener;
	}
}