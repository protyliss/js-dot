import {$$talk, $$talkingAbout, TalkScriptBase} from '../classes/talk-script-base';
import {TalkingAboutSse} from './talking-about-sse';

export class TalkSseBase<TListenType extends string = string> extends TalkScriptBase<TalkingAboutSse<TListenType>> {
	[$$talkingAbout]() {
		return TalkingAboutSse;
	}
}

