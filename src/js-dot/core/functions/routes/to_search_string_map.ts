import {fromSearchString} from './from-search-string';

const {isArray} = Array


export function toSearchStringMap(source: string): Record<string, any> ;
export function toSearchStringMap(source: string[]): Record<string, any> ;
export function toSearchStringMap<T extends string>(source: Array<[T, any]>): Record<T, any> ;
export function toSearchStringMap<T extends Record<string, any>>(source: T): T;
export function toSearchStringMap(source): Record<string, any> {
    if (!source) {
        return {};
    }

    switch (typeof source) {
        case 'object':
            if (isArray(source)) {
                const firstItem = source[0]
                if (!firstItem) {
                    return {}
                }
                if (isArray(firstItem)) {
                    return Object.fromEntries(source)
                }

                return fromSearchString(source.join('&'))
            }
            return source

        case 'string':
            return fromSearchString(source);
    }

    throw RangeError('Cannot be Search String Map')
}
