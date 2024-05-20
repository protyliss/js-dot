export class Repeater {
	protected _current: number;
	protected _begin: number;
	protected _end: number;

	static from(begin: number, end?: number) {
		return new Repeater(begin, end);
	}

	constructor(begin: number, end?: number) {
		if (!end) {
			end = begin;
			begin = 0;
		}
		this._begin = begin;
		this._end = end;
		this._current = 0;
	}

	previous() {
		const current = this._current--;
		if (current === this._begin) {
			this._current = this._end;
		}
		return current;
	}

	next() {
		const current = this._current++;
		if (current === this._end) {
			this._current = this._begin;
		}
		return current;
	}

	first() {
		const {_begin} = this;
		this._current = _begin;
		return _begin;
	}

	last() {
		const {_end} = this;
		this._current = _end;
		return _end;
	}
}
