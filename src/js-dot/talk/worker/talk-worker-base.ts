import {$$talkingAbout, TalkScriptBase} from '@js-dot/talk';
import {TalkingAboutWorker} from './talking-about-worker';

export abstract class TalkWorkerBase<TListenType extends string = string,
	TSpeakType extends string = string,
	TAskType extends string = string
> extends TalkScriptBase<TalkingAboutWorker<TListenType, TSpeakType, TAskType>> {
	[$$talkingAbout]() {
		return TalkingAboutWorker;
	}
}