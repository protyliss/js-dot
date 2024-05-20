import {HttpHeadersInit, HttpHeadersInterface} from '../interfaces/http';


/**
 * Implementer of Http Headers
 */
export class HttpHeaders implements HttpHeadersInterface {
	values: any = {};

	[Symbol.iterator](): IterableIterator<[string, string]> {
		throw new Error('Method not implemented.');
	}

	constructor(init?: HttpHeadersInit) {
		if (!init) {
			return;
		}

		this.values = init instanceof HttpHeaders ?
			{...init.values} :
			Array.isArray(init) ?
				Object.fromEntries(init) :
				init;
	}

	getSetCookie(): string[] {
		throw new Error('Method not implemented.');
	}

	entries(): IterableIterator<[string, string]> {
		return Object.entries(this.values) as any;
	}

	keys(): IterableIterator<string> {
		return Object.keys(this.values) as any;
	}


	append(name: string, value: string): void {
		this.values[name] = value;
	}

	delete(name: string): void {
		delete this.values[name];
	}

	get(name: string): string | null {
		return this.values[name];
	}

	has(name: string): boolean {
		return !!this.values[name];
	}

	set(name: string, value: string): void {
		this.values[name] = value;
	}

	forEach(callback: (value: string, key: string, parent: Headers) => void, thisArg?: any): void {
		const {values} = this;
		Object.keys(values).forEach(key => {
			callback.call(
				thisArg || this,
				values[key],
				key,
				this
			);
		});
	}
}
