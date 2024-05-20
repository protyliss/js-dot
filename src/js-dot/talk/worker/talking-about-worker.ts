import {TalkingWithAskBase, TalkingWithBase} from '@js-dot/talk';

export class TalkingAboutWorker<TListenType extends string = string,
	TSpeakType extends string = string,
	TAskType extends string = string
> extends TalkingWithAskBase<TListenType, TSpeakType, TAskType> {
}