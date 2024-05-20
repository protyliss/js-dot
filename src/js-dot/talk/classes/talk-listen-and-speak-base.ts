import {Identifier} from '@js-dot/core';
import {TalkListenBase} from './talk-listen-base';
import {TalkSpeaker} from './talk-speaker';

export class TalkListenAndSpeakBase<TListenTypes extends string = string, TSpeakTypes extends string | Identifier = string>
	extends TalkListenBase<TListenTypes> {
	protected _talkSpeakers = new Map<TSpeakTypes, ReturnType<this['_talkGetSpeaker']>>();

	/**
	 * @protected
	 */
	_talkGetSpeaker() {
		return TalkSpeaker;
	}

	speak(type: TSpeakTypes) {
		const {_talkSpeakers: map} = this;

		if ((type as any) in map) {
			throw new SyntaxError(`${type} is speaking already`)
		}

		const speaker = new (this._talkGetSpeaker() as any)(this, type);

	}
}