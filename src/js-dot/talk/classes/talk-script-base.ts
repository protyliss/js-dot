import {New} from '@js-dot/core';
import {TalkingWithBase} from '@js-dot/talk';

/**
 * Symbol of property name of talkingWith
 */
export const $$talk         = Symbol('talkingWith');
export const $$talkingAbout = Symbol('talkingAbout');

/**
 * Bulk operation for talk using class.
 */
export abstract class TalkScriptBase<TTalkingAbout extends TalkingWithBase> {
	/**
	 * TalkingAbout* Instance
	 */
	[$$talk]: TTalkingAbout;

	/**
	 * Get TalkingAbout* Constructor
	 */
	abstract [$$talkingAbout](): New<TTalkingAbout>

	constructor() {
		this[$$talk] = new (this[$$talkingAbout]())();
	}
}
