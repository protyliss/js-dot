import {fusion, pathWalk} from '@js-dot/core';

const {isArray: IS_ARRAY} = Array;

export abstract class ConfigureBase {
    protected _loadPromises: Array<[Function, Function]> = [];
    protected _values!: Object;

    constructor(target?: string) {
        if(target){
            this.load(target).then();
        }
    }

    /**
     * Load Each Data
     * @param url
     * @protected
     */
    protected abstract _getContent(url: string): Promise<any>;

    /**
     * Get Related Path of `extend` File
     * @param originTarget
     * @param extendTarget
     * @protected
     */
    protected abstract _getExtendPath(originTarget: string, extendTarget: string): string;

    /**
     * Load Configure Data and Set Values
     * @param target
     * @param childJson
     * @protected
     */
    protected _load(target: string, childJson?: {}): Promise<any> {
        return this._getContent(target)
            .then(json => {
                if (json['$schema']) {
                    delete json['$schema'];
                }

                if (childJson) {
                    json = fusion(json, childJson);
                }

                const extends_ = json.extends;

                if (!extends_) {
                    return json;
                }

                delete json.extends;

                return this._load(
                    extends_.indexOf('://') === -1 ? this._getExtendPath(target, extends_) : extends_,
                    json
                )
            })
    }

    /**
     * Load Configure Data
     * @param target
     */
    load(target: string): Promise<any> {
        return this._load(target).then(values => {
            this._values = values;

            const keys = Object.keys(values);
            let current = keys.length;
            while (current-- > 0) {
                let key = keys[current];
                const defaults = this[key];
                const value = values[key];

                if (typeof this[key] === 'function') {
                    key += '_';
                }

                this[key] = defaults && typeof defaults === 'object' ? fusion(defaults, value) : value;
            }

            const {_loadPromises} = this;
            const end = _loadPromises.length;
            current = -1;
            while (++current < end) {
                const [resolve] = _loadPromises[current];
                resolve(values);
            }

            this._loadPromises = null;
            this.loaded = () => Promise.resolve(values);

            return values;
        })
    }

    /**
     * Safety Waiting for Load Data
     */
    loaded() {
        return new Promise((resolve, reject) => {
            const {_loadPromises} = this;
            _loadPromises[_loadPromises.length] = [resolve, reject];
        });
    }


    /**
     * Get Optional Value with Promise
     * @param name
     * @param defaults
     */
    optioned<T extends string>(name: T[], defaults?: Record<T, any>): Promise<Record<T, any>>;
    /**
     * Get Optional Values as Map with Promise
     * @param names
     * @param defaults
     */
    optioned<T extends string>(names: T, defaults?: any): Promise<any>;
    optioned(names_or_name, defaults?): Promise<any> {
        return this.loaded().then(() => {
            return this.option(names_or_name, defaults);
        });
    }

    /**
     * Get Required Value with Promise
     * @param name
     */
    required(name: string): Promise<any>
    /**
     * Get Required Values as Map with Promise
     * @param names
     */
    required<T extends string>(names: string[]): Promise<Record<T, any>>;
    required(names_or_name): Promise<any> {
        return this.loaded().then(() => {
            return this.require(names_or_name);
        });
    }

    /**
     * Get Optional Value
     * @param name
     * @param defaults
     */
    option<T extends string>(name: T[], defaults: Record<T, any>): Record<T, any>;
    option<T extends string>(name: T, defaults?: any): any;
    option(name_or_names, defaults?) {
        if (IS_ARRAY(name_or_names)) {
            if (!defaults) {
                defaults = {};
            }
            const map = {};
            let current = name_or_names.length;
            while (current-- > 0) {
                const name = name_or_names[current];
                map[name] = this.option(name, defaults[name]);
            }
            return map;
        }

        const value = pathWalk(this._values, name_or_names);

        return defaults ?
            value === undefined ?
                defaults :
                typeof value === 'object' && typeof defaults === 'object' ?
                    fusion(value, defaults) :
                    value :
            value;
    }

    /**
     * Get Required Values as Map
     * @param names
     */
    require<T extends string>(names: T[]): Record<T, any>;
    /**
     * Get Required Value
     * @param name
     */
    require<T extends string>(name: T): any;

    require(names_or_name: string | string[]) {
        if (IS_ARRAY(names_or_name)) {
            const map = {};
            let current = names_or_name.length;
            while (current-- > 0) {
                const name = names_or_name[current];
                map[name] = this.require(name);
            }
            return map;
        }

        const value = this.option(names_or_name);

        if (value === undefined) {
            throw ReferenceError(`${names_or_name} is Required Configure Property`);
        }

        return value;
    }

    /**
     * Get Cascaded Value
     * @param defaults
     * @param values
     * @param overridePrefix
     * @param overrideNames
     */
    cascade<T extends Record<string, any>>(
        defaults: T,
        values: T,
        overridePrefix: string,
        overrideNames: Array<keyof T>): T {
        return null;
    }
}
