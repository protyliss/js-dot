import {TalkingWithListenAndSpeakBase} from './talking-with-listen-and-speak-base';

export class TalkingWithAskBase<TListenType extends string = string,
	TSpeakType extends string = string,
	TAskType extends string = string> extends TalkingWithListenAndSpeakBase<TListenType, TSpeakType> {

}