import * as DATA_FRAME from '@js-dot/data/frame';
import {movedTo} from '@js-dot/dev/compatible';

export * from './interfaces/column-map-series';
export * from './functions/public-api-index'

//////////////////////////////
// Deprecates

/**
 * @deprecated
 * @see import('@js-dot/data/frame').frameInterpolate
 */
export const frameInterpolate       = movedTo(DATA_FRAME.frameInterpolate);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').frameStringify
 */
export const frameStringify         = movedTo(DATA_FRAME.frameStringify);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').frameToXYSeries
 */
export const frameToXYSeries        = movedTo(DATA_FRAME.frameToXYSeries);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').frameToXYSeriesSet
 */
export const frameToXYSeriesSet     = movedTo(DATA_FRAME.frameToXYSeriesSet);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').fromDataArrayKeySeries
 */
export const fromDataArrayKeySeries = movedTo(DATA_FRAME.fromDataArrayKeySeries);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').fromDataArraySeries
 */
export const fromDataArraySeries    = movedTo(DATA_FRAME.fromDataArraySeries);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').fromDataMapKeySeries
 */
export const fromDataMapKeySeries   = movedTo(DATA_FRAME.fromDataMapKeySeries);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').fromDataMapSeries
 */
export const fromDataMapSeries      = movedTo(DATA_FRAME.fromDataMapSeries);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').fromDataSeries
 */
export const fromDataSeries         = movedTo(DATA_FRAME.fromDataSeries);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').fromTimeSeriesArrayMap
 */
export const fromTimeSeriesArrayMap = movedTo(DATA_FRAME.fromTimeSeriesArrayMap);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').getTimeSeriesFromFrame
 */
export const getTimeSeriesFromFrame = movedTo(DATA_FRAME.getTimeSeriesFromFrame);
/**
 * @deprecated
 * @see import('@js-dot/data/frame').transpose
 */
export const transpose              = movedTo(DATA_FRAME.transpose);