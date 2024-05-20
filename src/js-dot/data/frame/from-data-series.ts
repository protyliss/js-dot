import {DataArraySeries, DataMapSeries} from '../interfaces/column-map-series';
import {fromDataArraySeries} from './from-data-array-series';
import {fromDataMapKeySeries} from './from-data-map-key-series';
import {fromDataArrayKeySeries} from './from-data-array-key-series';
import {fromDataMapSeries} from './from-data-map-series';

const {isArray} = Array;

export function fromDataSeries(series: DataArraySeries | DataMapSeries) {

    if (isArray(series)) {
        if (isArray(series[0])) {
            return fromDataArraySeries(series as any);
        }else{
            return fromDataMapSeries(series);
        }
    }
    if (typeof series === 'object'){
        if (isArray(series[0])){
            return fromDataArrayKeySeries(series as any);
        }else{
            return fromDataMapKeySeries(series as any);
        }
    }
}
