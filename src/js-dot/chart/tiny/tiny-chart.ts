import {isNumeric} from '../../core';
import {$append, $tag} from '../../ui';
import {TinyChartOption} from './interfaces';

const {ceil: CEIL, min: MIN, max: MAX} = Math;
const DOUBLE_PI = 2 * Math.PI;

interface TinyChartDrawValue {
    x?: number;
    y?: number;
    yy?: number;
    value?: number;
}

export class TinyChart {
    protected _node: HTMLElement;
    protected _min: number;
    protected _max: number;
    protected _limit: number;

    protected _sizer: HTMLDivElement;

    protected _canvasCount: number;
    protected _canvases: Record<string, HTMLCanvasElement>;
    protected _contexts: Record<string, CanvasRenderingContext2D>;

    protected _verticalPadding: number;
    protected _horizontalPadding: number;

    protected _pointSize: number;

    protected _width: number;
    protected _height: number;
    protected _drawWidth: number;
    protected _drawHeight: number;
    protected _baseY: number;
    protected _maxMinusMin: number;
    protected _drawers: { contexts: CanvasRenderingContext2D[], lasts: any[]; firsts: any[]; eaches: any[] };

    protected _selfResize = this._resize.bind(this);
    protected _resizeTimer;
    protected _drawTimer;

    option: TinyChartOption;
    data: number[];


    constructor(node: HTMLElement, option?: Partial<TinyChartOption>) {
        node.style.position = 'relative';

        this._node = node;

        option = {
            limit: null,
            min: null,
            max: null,
            bar: false,
            barSize: 2,
            barColor: '#000',
            line: false,
            lineFill: false,
            lineSize: 2,
            lineColor: '#000',
            lineFillColor: '#00000080',
            point: false,
            pointSize: 4,
            pointColor: '#000',
            ...(option || {})
        };

        if (!(option.bar || option.line || option.lineFill || option.point)) {
            option.bar = true;
        }

        this.option = option as TinyChartOption;

        this._sizer = $append(
            node,
            $tag('div', {
                style: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    zIndex: '-1'
                }
            })
        );

        this._canvasCount = 0;
        this._canvases = {};
        this._contexts = {};


        const contexts = [];
        const firsts = [];
        const eaches = [];
        const lasts = [];

        this._pointSize = option.pointSize / 2;

        let verticalPadding = 0;

        if (option.bar) {
            const index = contexts.length;
            contexts[index] = this._addCanvas('bar');
            firsts[index] = this._drawBarFirst.bind(this);
            eaches[index] =
                lasts[index] = this._drawBar.bind(this);
        }


        if (option.lineFill) {
            const index = contexts.length;
            contexts[index] = this._addCanvas('lineFill');
            firsts[index] = this._drawLineFillFirst.bind(this);
            eaches[index] = this._drawLineFill.bind(this);
            lasts[index] = this._drawLineFillLast.bind(this);
        }

        if (option.line) {
            const index = contexts.length;
            contexts[index] = this._addCanvas('line');
            firsts[index] = this._drawLineFirst.bind(this);
            eaches[index] = this._drawLine.bind(this);
            lasts[index] = this._drawLineLast.bind(this);

            verticalPadding = MAX(verticalPadding, option.lineSize);
        }

        if (option.point) {
            const index = contexts.length;
            contexts[index] = this._addCanvas('point');
            firsts[index] =
                eaches[index] =
                    lasts[index] = (
                        {
                            max: this._drawPointWhenMin,
                            min: this._drawPointWhenMax,
                            border: this._drawPointWhenBorder,
                        }[option.point as string]
                        || this._drawPoint
                    ).bind(this);

            verticalPadding = MAX(verticalPadding, option.pointSize / 2);
        }

        const horizontalPadding = option.pointSize;

        this._verticalPadding = verticalPadding;
        this._horizontalPadding = horizontalPadding;

        this._setSize();

        this._drawers = {
            contexts,
            firsts: firsts,
            eaches: eaches,
            lasts: lasts
        };
    }

    protected _setSize() {
        const {scrollWidth: width, scrollHeight: height} = this._sizer;

        this._width = width;
        this._height = height;

        this._drawWidth = width - (this._horizontalPadding);
        this._drawHeight = height - (this._verticalPadding * 2);

        const {_canvases} = this;
        const keys = Object.keys(_canvases);
        let current = keys.length;

        while (current-- > 0) {
            const canvas = _canvases[keys[current]];
            canvas.width = width;
            canvas.height = height;
        }
    }

    protected _addCanvas(key) {
        const canvas = $append(
            this._node,
            $tag(
                'canvas',
                this._canvasCount++ ?
                    {
                        style: {
                            position: 'absolute',
                            left: '0',
                            right: '0'
                        }
                    } :
                    null
            )
        );
        const context = canvas.getContext('2d');

        this._canvases[key] = canvas;
        this._contexts[key] = context;

        return context;
    }

    protected _getPosition(current) {
        const {_limit, _min, _drawHeight, _baseY, _maxMinusMin} = this;
        const value = this.data[current];

        const x = CEIL(this._drawWidth * (current / _limit))
            + this._horizontalPadding;

        const y = CEIL((((value - _min) / _maxMinusMin)) * _drawHeight)
            + this._verticalPadding;
        const yy = _baseY - y;

        return {
            x, y, yy, value
        };
    }

    protected _getColor(context, color) {
        if (!Array.isArray(color)) {
            return color;
        }

        const gd = context.createLinearGradient(0, 0, 0, this._drawHeight);
        const end = color.length;
        let current = -1;
        while (++current < end) {
            gd.addColorStop((current + 1) / end, color[current]);
        }

        return gd;
    }

    protected _drawBarFirst(context, {value, x, y, yy}: TinyChartDrawValue) {
        const {option} = this;
        const {barColor} = option;

        let color = barColor;

        if (Array.isArray(color)) {
            if (this._min < 0) {
                if (this._max <= 0) {
                    color.reverse();
                } else if (color.length < 3) {
                    color = color.concat(color.slice().reverse());
                }
            }
        }

        context.fillStyle = this._getColor(context, color);
        this._drawBar(context, {value, x, y, yy});
    }

    protected _drawBar(context, {x, y, yy}: TinyChartDrawValue) {
        const {option} = this;

        x += (this._horizontalPadding - option.barSize) / 2;

        context.fillRect(x, y, option.barSize, yy);
    }

    protected _drawLineFirst(context, {x, y, yy}: TinyChartDrawValue) {
        context.moveTo(0, y);
        this._drawLine(context, {x, y, yy});
    }

    protected _drawLine(context, {x, y}: TinyChartDrawValue) {
        x += this._horizontalPadding / 2;
        context.lineTo(x, y);
    }

    protected _drawLineLast(context, {x, y, yy}: TinyChartDrawValue) {
        this._drawLine(context, {x, y, yy});
        context.lineTo(this._width, y);

        const {option} = this;
        context.lineWidth = option.lineSize;
        context.strokeStyle = option.lineColor;
        context.stroke();
    }

    protected _drawLineFillFirst(context, {y}: TinyChartDrawValue) {
        context.beginPath();
        context.moveTo(0, this._baseY);
        context.lineTo(0, y);
        context.lineTo(this._horizontalPadding, y);
    }

    protected _drawLineFill(context, {x, y}: TinyChartDrawValue) {
        x += this._horizontalPadding / 2;
        context.lineTo(x, y);
    }

    protected _drawLineFillLast(context, {x, y, yy}: TinyChartDrawValue) {
        this._drawLine(context, {x, y, yy});

        const {_width} = this;
        context.lineTo(_width, y);
        context.lineTo(_width, this._baseY);

        context.closePath();
        context.fillStyle = this._getColor(context, this.option.lineFillColor);
        context.fill();
    }

    protected _drawPoint(context, {x, y}: TinyChartDrawValue) {
        const {_pointSize} = this;
        x += _pointSize;

        context.beginPath();
        context.arc(x, y, _pointSize, 0, DOUBLE_PI, false);
        context.fillStyle = this.option.pointColor;
        context.fill();
        context.closePath();
    }

    protected _drawPointWhenMax(context, {x, y, value}: TinyChartDrawValue) {
        console.log('draw max', value, this._max, value === this._max);
        if (value === this._max) {
            this._drawPoint(context, {x, y});
        }
    }

    protected _drawPointWhenMin(context, {x, y, value}: TinyChartDrawValue) {
        if (value === this._min) {
            this._drawPoint(context, {x, y});
        }
    }

    protected _drawPointWhenBorder(context, {x, y, value}: TinyChartDrawValue) {
        if (value === this._min || value === this._max) {
            this._drawPoint(context, {x, y});
        }
    }

    protected _draw() {
        const {data} = this;
        const {contexts, firsts, eaches, lasts} = this._drawers;
        const drawerEnd = firsts.length;
        let drawerCurrent = drawerEnd;
        const firstArgs = this._getPosition(0);
        while (drawerCurrent-- > 0) {
            firsts[drawerCurrent](contexts[drawerCurrent], firstArgs);

        }

        const beforeEnd = data.length - 1;
        let current = 0;
        while (++current < beforeEnd) {
            const midArgs = this._getPosition(current);
            drawerCurrent = drawerEnd;
            while (drawerCurrent-- > 0) {
                eaches[drawerCurrent](contexts[drawerCurrent], midArgs);
            }
        }

        if (beforeEnd) {
            const lastArgs = this._getPosition(beforeEnd);
            drawerCurrent = drawerEnd;
            while (drawerCurrent-- > 0) {
                lasts[drawerCurrent](contexts[drawerCurrent], lastArgs);
            }
        }
    }

    setData(data: number[]) {
        const {contexts} = this._drawers;
        let current = contexts.length;
        while (current-- > 0) {
            contexts[current].clearRect(0, 0, this._width, this._height);
            contexts[current].beginPath();
        }

        if (!(data && data.length)) {
            return;
        }
        this.data = data;

        const {option} = this;

        if (!this.option.limit) {
            this._limit = data.length;
        }

        let min = option.min;
        let max = option.max;

        const findMin = !isNumeric(min);
        const findMax = !isNumeric(max);

        if (findMin || findMax) {
            current = data.length;

            if (findMin) {
                min = 0;
                if (findMax) {
                    max = 0;

                    while (current-- > 0) {
                        const value = data[current];
                        min = MIN(min, value);
                        max = MAX(max, value);
                    }
                } else {
                    min = 0;
                    while (current-- > 0) {
                        min = MIN(min, data[current]);
                    }
                }
            } else {
                max = 0;
                while (current-- > 0) {
                    max = MAX(max, data[current]);
                }
            }
        }

        this._min = min;
        this._max = max;
        this._maxMinusMin = this._max - this._min;

        const {_drawHeight} = this;
        this._baseY = min < 0 && max > 0 ?
            ((0 - min) / this._maxMinusMin) * _drawHeight :
            min >= 0 && max >= 0 ?
                _drawHeight :
                0;

        this._draw();
    }

    resize() {
        const {_resizeTimer} = this;
        if (_resizeTimer) {
            clearTimeout(_resizeTimer);
        }
        this._resizeTimer = setTimeout(this._selfResize, 240);
    }

    protected _resize() {
        this._setSize();
        if (this.data) {
            this._draw();
        }
    }
}
