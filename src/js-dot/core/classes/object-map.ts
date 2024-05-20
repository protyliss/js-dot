import {pathWalk} from '@js-dot/core';

/**
 * Object Mapper for Renamed Properties
 *
 * @example Default Usage
 * const map = new ObjectMap({
 *  alpha: 'foo',
 *  bravo: 'bar.baz'
 * });
 *
 * const item = {foo: 1, bar: {baz: 2}}
 *
 * // return 1
 * map.get(item, 'alpha');
 *
 * // return {alpha: 1, bravo: 2}
 * map.getAll(item);
 */
export class ObjectMap<TObject extends object = any, TMap extends string = string> {
    protected _map: Record<TMap, keyof TObject | string>;

    constructor(map: Record<TMap, keyof TObject | string>) {
        this._map = map;
    }

    /**
     * Get One of renamed property
     * @param object
     * @param name
     */
    get(object: TObject, name: TMap) {
        return pathWalk(object, this._map[name] as string);
    }

    /**
     * Get All of renamed properties
     * @param object
     */
    getAll(object: TObject): Record<TMap, TObject[keyof TObject]> {
        const {_map} = this;

        const result = {};
        for (const name in _map) {
            if (!_map.hasOwnProperty(name)) {
                continue;
            }
            result[name as string] = pathWalk(object, _map[name] as string)
        }

        return result as any;
    }
}