import {TalkListenBase} from '@js-dot/talk';

export abstract class TalksSseBase<TTypes extends string = string> extends TalkListenBase {
	protected _talkEventSource: EventSource;
	protected _talkOnline: boolean;
	protected _talkTypeBeforeOnline: TTypes[] = [];
	protected _talkListenMap: Record<TTypes, any>;
	protected _talkAddType(type: TTypes){
		if(!this._talkOnline){
			const {_talkTypeBeforeOnline} = this;
			_talkTypeBeforeOnline[_talkTypeBeforeOnline.length] = type;
			return;
		}

		const {_talkListenMap} = this;

		this._talkEventSource.addEventListener(
			type,
			(event: MessageEvent) => {
				const talk = _talkListenMap[type];
				if(talk){
					talk.fetch(
						JSON.parse(event.data)
					);
				}
			}
		)
	}


	open(url: string){
		const eventSource = new EventSource(
			url,
			{
				withCredentials: true
			}
		)

		this._talkEventSource = eventSource;

		eventSource.onopen = () => {
			this.online();

			const {_talkTypeBeforeOnline} = this;
			let current = _talkTypeBeforeOnline.length;
			while(current-->0){
				this._talkAddType(_talkTypeBeforeOnline[current]);
			}

			this._talkTypeBeforeOnline = [];
		}

		eventSource.onerror = reason => {
			this.offline();
		};
	}

	online(){
		this._talkOnline = true;
	}

	offline(){
		this._talkOnline = false;
	}


	listen<TResponse>(type: TTypes){
		this._talkAddType(type);
		return super.listen(type);
	}
}
