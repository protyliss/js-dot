import {Identifier} from '@js-dot/core';
import {TalkingWithListenBase} from './talking-with-listen-base';
import {TalkCallbackSpeaker} from './talk-callback-speaker';

export class TalkingWithListenAndSpeakBase<TListenType extends string = string, TSpeakType extends string | Identifier = string> extends TalkingWithListenBase<TListenType> {
	protected _talkSpeakers = new Map<TSpeakType, ReturnType<this['_talkGetSpeaker']>>();

	_talkGetSpeaker(){
		return TalkCallbackSpeaker;
	}
	speak(type: TSpeakType){
		const {_talkSpeakers: map} = this;

		if(map.has(type)){
			throw new SyntaxError(`${type} is speaking already`);
		}

		const speaker = new (this._talkGetSpeaker())(this, type);

	}
}