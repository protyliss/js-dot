import {HttpRequest} from '@js-dot/api/http';

export class HttpResponse implements Response {
	request: any;
	originResponse: Response;

	protected _intercepted: boolean;

	constructor(request, response) {
		this.request = {
			method: request.method,
			url: request.url,
			option: request.option
		}


		const originResponse = response?.originResponse || response;
		this.originResponse  = originResponse;
		if (!(originResponse instanceof Response || (originResponse as any) instanceof HttpResponse)) {
			if (!(
				typeof originResponse === 'object'
				&& originResponse.hasOwnProperty('bodyUsed')
				&& originResponse.hasOwnProperty('body')
				&& originResponse.hasOwnProperty('status')
			)) {
				this._intercepted = true;
			}
		}
	}

	get url() {
		return this.request.url;
	}

	get status() {
		return this.originResponse.status;
	}

	get body() {
		return this._intercepted ? this.originResponse as any : this.originResponse.body;
	}

	get bodyUsed() {
		return this._intercepted || this.originResponse.bodyUsed;
	}

	get headers() {
		return this.originResponse.headers;
	}

	get ok() {
		return this._intercepted || this.originResponse.ok;
	}

	get redirected() {
		return this.originResponse.redirected;
	}

	get statusText() {
		return this.originResponse.statusText;
	}

	get type() {
		return this.originResponse.type;
	}

	arrayBuffer(): Promise<ArrayBuffer> {
		return Promise.resolve(undefined);
	}

	blob(): Promise<Blob> {
		return this.originResponse.blob();
	}

	clone(): Response {
		return this.originResponse.clone();
	}

	formData(): Promise<FormData> {
		return this.originResponse.formData();
	}

	protected _parsePromises = [];
	protected _parsed!: any;

	#getParse<T extends 'json' | 'text'>(type: T): Promise<T extends 'json' ? any : string> {
		const {originResponse} = this;
		if (this._intercepted) {
			return Promise.resolve(this.originResponse) as any;
		}

		const {_parsePromises} = this;
		if (this.bodyUsed) {
			const {_parsePromises, _parsed} = this;
			return new Promise((resolve, reject) => {
				_parsePromises[_parsePromises.length] = [resolve, reject];
			});
		}

		return originResponse[type]()
			.then(result => {
				let current = _parsePromises.length;
				while (current-- > 0) {
					_parsePromises[current][0](result);
				}
				this._parsed        = result;
				this._parsePromises = null;
				this[type]          = this.#getSuccess.bind(this);
				return result;
			})
			.catch(reason => {
				let current = _parsePromises.length;
				while (current-- > 0) {
					_parsePromises[current][1](reason);
				}
				this._parsed        = reason;
				this._parsePromises = null;
				this[type]          = this.#getFail.bind(this);
				throw reason;
			});
	}

	#getSuccess<T extends 'json' | 'text'>(type: T): Promise<T extends 'json' ? any : string> {
		return Promise.resolve(this._parsed);
	}

	#getFail() {
		return Promise.reject(this._parsed);
	}

	json(): Promise<any> {
		return this.#getParse('json');
	}

	text(): Promise<string> {
		// console.log('text() call');
		return this.#getParse('text');
	}
}
