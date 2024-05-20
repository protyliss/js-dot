import {CssColor} from '../typings/css';

export class ColorRange {
    _colors: CssColor[];

    static from(...colors: [CssColor[]] | CssColor[]) {
        return new ColorRange(...colors);
    }

    constructor(...colors: [CssColor[]] | CssColor[]) {
        this._colors = Array.isArray(colors[0]) ?
            colors[0] :
            colors as CssColor[];
    }

    getByValue(value: number | string, min: number, max?): CssColor {
        value = +value;

        const {_colors} = this;

        if (!value) {
            return _colors[0];
        }

        if (!max) {
            max = min;
            min = 0;
        }

        const percent = Math.abs(value) / (max - min);


        const index = percent > 1 ?
            _colors.length - 1 :
            Math.round((_colors.length - 1) * percent);

        return _colors[index];
    }
}
