import {$$talkingAbout, TalkScriptBase} from '@js-dot/talk';
import {TalkingAboutFrame} from './talking-about-frame';

export abstract class TalkFrameBase<TListenType, TSpeakType, TAskType> extends TalkScriptBase<TalkingAboutFrame> {
	[$$talkingAbout]() {
		return TalkingAboutFrame;
	}
}