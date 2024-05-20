import {$$talkingAbout, TalkScriptBase} from '@js-dot/talk';
import {TalkingAboutWs} from './ws-talk';

export abstract class TalkWsBase<TListenType extends string = string,
	TSpeakType extends string = string,
	TAskType extends string = string
> extends TalkScriptBase<TalkingAboutWs<TListenType, TSpeakType, TAskType>> {
	[$$talkingAbout]() {
		return TalkingAboutWs;
	}
}