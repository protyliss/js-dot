/**
 * [label, key, value]
 */
export type DataArray = any[];

/**
 * {label, key, value}
 */
export type DataMap = Record<string, any>;

/**
 * [
 *  [label, key, value]
 * ]
 */
export type DataArraySeries = DataArray[];

/**
 * [
 *  {label, key, value}
 * ]
 */
export type DataMapSeries = DataMap[];

/**
 * {
 *     label: [
 *         {key, value}
 *     ]
 * }
 */
export type DataMapKeySeries = Record<string, DataMapSeries>;

/**
 * {
 *     label: [
 *         [key, value]
 *     ]
 * }
 */
export type DataArrayKeySeries = Record<string, DataArraySeries>;

export type TimeSeriesArrayMap = Record<string, Array<[any, any, ...any]>>;
export type DataFrame = Array<Array<any>>;