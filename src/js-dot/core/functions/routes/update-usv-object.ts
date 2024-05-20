import {fromSearchString} from './from-search-string';
import {toSearchStringMap} from './to_search_string_map';

export function updateUsvObject(queryString: string, source?: string | Record<string, any>): Record<string, any>;
// tslint:disable-next-line:unified-signatures
export function updateUsvObject(queryArray: Array<[string, string | number]>, source?: string | Record<string, any>);
// tslint:disable-next-line:unified-signatures
export function updateUsvObject(queryMap: Record<string, string | number>, source?: string | Record<string, any>);
export function updateUsvObject(string_or_array_or_map, source) {

    const target = toSearchStringMap(string_or_array_or_map)

    if (!source) {
        source = fromSearchString(location.search);
    } else if (typeof source === 'string') {
        source = fromSearchString(source);
    }else{
        source = toSearchStringMap(source);
    }

    const map = {...source};

    if (!target){
        return map;
    }

    const names = Object.keys(target);
    const end = names.length;
    let current = -1;
    while (++current < end) {
        let name = names[current];
        const value = target[name];

        if (name.endsWith('?')) {
            name = name.substr(0, name.length - 1);
        }


        if ((value === null || value === undefined || value === '')) {
            if (map.hasOwnProperty(name)) {
                delete map[name];
            }
        } else {
            map[name] = value;
        }
    }

    return map;
}
