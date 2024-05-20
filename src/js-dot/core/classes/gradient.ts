/**
 * Means Use as Color
 */
import {ColorSource, parseColor} from '../functions/colors/parse-color';

export class Gradient {
	protected _beginArray: number[];
	protected _r: number;
	protected _g: number;
	protected _b: number;
	protected min: number;
	protected max: number;

	constructor(begin: ColorSource, end: ColorSource, min = 0, max = 1) {
		const beginArray = parseColor(begin);
		const endArray   = parseColor(end);

		this._beginArray = beginArray;

		this._r  = endArray[0] - beginArray[0];
		this._g  = endArray[1] - beginArray[1];
		this._b  = endArray[2] - beginArray[2];
		this.min = min;
		this.max = max;
	}

	protected _getRgbArray(value: number) {
		const {_beginArray} = this;
		let step            = this.getStep(value);
		step                = step < 0 ? 0 : step > 1 ? 1 : step;

		const {round} = Math;
		return [
			_beginArray[0] + round(this._r * step),
			_beginArray[1] + round(this._g * step),
			_beginArray[2] + round(this._b * step)
		];
	}

	getStep(value: number) {
		return value ?
			(Math.min(100, Math.round((value - this.min) / (this.max - this.min) * 100))) / 100 :
			0;
	}

	getRgb(value: number) {
		const [r, g, b] = this._getRgbArray(value);
		return `rgb(${r}, ${g}, ${b})`;
	}

	getRgba(value: number, alpha?: number) {
		const [r, g, b] = this._getRgbArray(value);

		const a = alpha === undefined ?
			value :
			1 < alpha ?
				alpha / 100 :
				alpha;

		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}

	getHex(value: number) {
		const [r, g, b] = this._getRgbArray(value);
		return '#'
			+ r.toString(16)
			+ g.toString(16)
			+ b.toString(16);
	}
}
