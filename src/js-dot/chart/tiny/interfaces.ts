export interface TinyChartOption {
	/**
	 * Item Limit
	 *
	 * @default Length of Data
	 */
	limit: number;

	/**
	 * Minimum Value
	 *
	 * @default Look up the Minimum value of Data
	 */
	min: number;

	/**
	 * Maximum Value
	 *
	 * @default Look up the Maximum value of Data
	 */
	max: number;

	/**
	 * Draw Bar
	 *
	 * @default true
	 */
	bar: boolean;

	/**
	 * Bar Width
	 * @default 2
	 */
	barSize: number;

	/**
	 * Bar Background Color
	 *
	 * @default #000
	 * @description
	 * - string: Solid Color
	 * - string[]: Gradient Color
	 */
	barColor: string | string[];

	/**
	 * Draw Line
	 *
	 * @default false
	 */
	line: boolean;

	/**
	 * Line Width
	 *
	 * @default 2
	 */
	lineSize: number;

	/**
	 * Line Color
	 *
	 * @default #000
	 */
	lineColor: string;

	/**
	 * Draw Line Background Color
	 *
	 * @default false
	 */
	lineFill: boolean;

	/**
	 * Line Background Color
	 *
	 * @default #00000080
	 * @description
	 * - string: Solid Color
	 * - string[]: Gradient Color
	 */
	lineFillColor: string | string[];

	/**
	 * Draw Point
	 *
	 * @description
	 * - true: Draw All Value
	 * - min: Draw when value is Minimum value
	 * - max: Draw when value is Maximum value
	 * - border: Draw when value is Minimum or Maximum value
	 * @default false
	 */
	point: boolean | 'min' | 'max' | 'border';

	/**
	 * Point Size
	 * @default 4
	 */
	pointSize: number;

	/**
	 * Point Background Color
	 * @default #000
	 */
	pointColor: string;
}