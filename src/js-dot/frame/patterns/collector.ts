export interface DecorateCollectorCallbackArgs<T> {
	meta: T,
	target: Object | Function,
	propertyKey?: string | symbol,
	descriptor?: PropertyDescriptor
}
export interface DecorateCollectorOption<T> {
  callback?(args?: DecorateCollectorCallbackArgs<T>): void;
}

export type DecorateCollector<TDecorator> = TDecorator & {
  collection: Set<any>;
};

export interface MetaDecorateCollector<TMeta, U, TDecorator> {
  (meta?: TMeta): TDecorator;

  collection: Map<any, U>;
}

type C = ClassDecorator;
type M = MethodDecorator;
type P = PropertyDecorator;

/**
 * Create Meta Collector for Class
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { class: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, C>
/**
 * Create Meta Collector for Method
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { method: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, M>;
/**
 * Create Meta Collector for Property
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { property: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, P>;
/**
 * Create Meta Collector for Class and Method
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { class: true, method: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, C & M>;
/**
 * Create Meta Collector for Class and Property
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { class: true, property: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, C & P>;
/**
 * Create Meta Collector for Method and Property
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { method: true, property: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, M & P>;
/**
 * Create Meta Collector for Class, Method and Property
 * @param option
 */
export function metaDecorateCollector<T>(
  option: { class: true, method: true, property: true } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, T, C & M & P>;
/**
 * Create Meta Collector for Class with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { class: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, C>;
/**
 * Create Meta Collector for Method with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { method: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, M>;
/**
 * Create Meta Collector for Property with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { property: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, P>;
/**
 * Create Meta Collector for Class and Method with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { class: true, method: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, C & M>;
/**
 * Create Meta Collector for Class and Property with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { class: true, property: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, C & P>;
/**
 * Create Meta Collector for Method and Property with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { method: true, property: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, M & P>;
/**
 * Create Meta Collector for Class, Method and Property with Transform Callback
 * @param option
 */
export function metaDecorateCollector<T, U>(
  option: { class: true, method: true, property: true, transform(meta: T): U } & DecorateCollectorOption<T>
): MetaDecorateCollector<T, U, C & M & P>;

export function metaDecorateCollector(option) {

  const {class: useClass, method: useMethod, property: useProperty, callback, transform} = option || {};

  if (!(useClass || useMethod || useProperty)) {
    throw new SyntaxError('Required over then one collection target from class, method or property of option');
  }

  const MAP = new Map();

  const set = useClass ?
    useMethod ?
      useProperty ?
        function class_method_property(meta, target, propertyKey) {
          if (propertyKey) {
            if (isMethod(target, propertyKey)) {
              MAP.set(target[propertyKey], meta);
            } else {
              MAP.set(target, meta);
            }
          } else {
            MAP.set(target, meta);
          }
        } :
        function class_method(meta, target, propertyKey) {
          if (propertyKey) {
            if (isMethod(target, propertyKey)) {
              MAP.set(target[propertyKey], meta);
            } else {
              throw new SyntaxError('Unable as property decorator');
            }
          } else {
            MAP.set(target, meta);
          }
        } :
      useProperty ?
        function class_property(meta, target, propertyKey) {
          if (propertyKey) {
            if (isMethod(target, propertyKey)) {
              throw new SyntaxError('Unable as method decorator');
            } else {
              MAP.set(target, meta);
            }
          } else {
            MAP.set(target, meta);
          }
        } :
        function classOnly(meta, target, propertyKey) {
          if (propertyKey) {
            throw new SyntaxError('Unable as method and property decorator');
          }

          MAP.set(target, meta);
        } :
    useMethod ?
      useProperty ?
        function method_property(meta, target, propertyKey) {
          if (!propertyKey) {
            throw new SyntaxError('Unable as class decorator');
          }

          if (isMethod(target, propertyKey)) {
            MAP.set(target[propertyKey], meta);
          } else {
            MAP.set(target, meta);
          }
        } :
        function methodOnly(meta,target, propertyKey) {
          if (!propertyKey || !isMethod(target, propertyKey)) {
            throw new SyntaxError('Unable as class and property decorator');
          }
          MAP.set(target[propertyKey], meta);
        } :
      function propertyOnly(meta, target, propertyKey) {
        if (!propertyKey || isMethod(target, propertyKey)) {
          throw new SyntaxError('Unable as class and method decorator');
        }

        MAP.set(target, meta);
      };

  const collector = callback ?
    transform ?
      function callback_transform(meta) {
        return function (target: Function | Object, propertyKey?: string | symbol) {
          meta = transform(meta);
          set(meta, target, propertyKey);
          callback({meta, target, propertyKey});
        };
      } :
      function callbackOnly(meta) {
        return function (target: Function | Object, propertyKey?: string | symbol) {
          set(meta, target, propertyKey);
          callback({meta, target, propertyKey});
        };
      } :

    transform ?
      function transformOnly(meta) {
        return function (target: Function | Object, propertyKey?: string | symbol) {
          set(transform(meta), target, propertyKey);
        };
      } :
      function collectOnly(meta) {
        return function (target: Function | Object, propertyKey?: string | symbol) {
          set(meta, target, propertyKey);
        };
      };

  collector['collection'] = MAP;

  return collector as MetaDecorateCollector<any, any, any>;

  function isMethod(target: Object, propertyKey: string | symbol) {
    return typeof target.constructor.prototype[propertyKey] === 'function';
  }
}