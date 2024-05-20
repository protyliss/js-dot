/*
 * Regular Expressions
 */

/**
 * Number
 * @example
 * - 1
 * - 11
 */
export const _NUMBER = /^[+-]?\d+$/;

/**
 * Number and Float
 * @example
 * - 1
 * - +1
 * - -1
 * - 1.1
 * - +1.1
 * - -1.1
 */
export const _NUMERIC = /^[+-]?\d+(\.\d+)?$/;

export const _EMAIL = /^\w[_\-+\w]*@([\-\w]+)(\.[\-\w]+)+$/;

/**
 * Phone Number
 * @example
 * - 1234-1234
 * - 123-1234
 * - 1234-1234
 * - 01-123-1234
 * - 01-1234-1234
 * - 012-123-1234
 * - 012-1234-1234
 * - +123 1234-1234
 */
export const _TEL = /^(\+\d{1,3}(?:(?:\s\d{1,4}){1,2})?\s)?(\d{2,4}(?:-\d{3,4}(?:-\d{4})?))$/;

/**
 * Unix Time
 * @example
 * - 123467890123
 */
export const _UNIX_TIME = /^\d{13}$/;

/**
 * Timestamp
 * @example
 * - 99-12-31
 * - 99-12-31T12
 * - 99-12-31T12:59
 * - 99-12-31T12:59:59
 * - 99-12-31T12:59:59.999
 * - 99-12-31T12:59:59.999-99:99
 * - 99-12-31T12:59:59.999+99:99
 * - 9999-12-31
 * - 9999-12-31
 * - 9999-12-31T12
 * - 9999-12-31T12:59
 * - 9999-12-31T12:59:59
 * - 9999-12-31T12:59:59.999
 * - 9999-12-31T12:59:59.999-99:99
 * - 9999-12-31T12:59:59.999+99:99
 */
export const _TIMESTAMP = /^(?:(\d{2,4})[-./](1[012]|0?\d)[-./]([12]\d|3[01]|0?\d)(?:[T\s](1\d|2[0-4]|0?\d)(?:\:([1-5]\d|0?\d)(?:\:(?:([1-5]\d|0?\d))(?:\.(\d+)?Z?)?)?)?)?([+-]\d{2}:?\d{2})?|.+ GMT)$/;

/**
 * Mappable Path
 * @example
 * - a
 * - a/b
 * - :a
 * - :a/b
 * - a/:b
 * - :a/:b
 * - /a
 * - /a/b
 * - /:a
 * - /:a/b
 * - /a/:b
 * - /:a/:b*
 */
export const _MAPPABLE_PATH = /^(\/?:?[\w-_]+)(\/:?[\w-_]+)*$/;

/**
 * IP v4
 */
export const _IP = /^(\d{1,3}(\.\d{1,3}){3}|[\da-f]{4}(?::([\da-f]{1,4})?){1,7})$/i;

/**
 * IP v4
 * @example
 * - 0.0.0.0
 * - 255.255.255.255
 */
export const _IP4 = /^(2(?:[0-4]\d|5[0-5])|1\d\d|\d\d?)\.(2(?:[0-4]\d|5[0-5])|1\d\d|\d\d?)\.(2(?:[0-4]\d|5[0-5])|1\d\d|\d\d?)\.(2(?:[0-4]\d|5[0-5])|1\d\d|\d\d?)$/;

/**
 * IP v6 Shorten length
 * @description
 * This pattern alone does not guarantee perfection.
 * Test with `_FULL_IP6`, Check the `indexOf('::') > -1` when not matched
 */
export const _SHORTEN_IP6 = /^[a-f\d]{0,4}(::?[a-f\d]{0,4}){0,6}(::?(\d{1,3}(\.\d{1,3}){3}(\/\d+)?|[a-f\d]{0,4}))$/i;

/**
 * IP v6 Full length
 * @description
 * This pattern alone does not guarantee perfection.
 * Test with `_FULL_IP6`, Check the `indexOf('::') > -1` when not matched
 */
export const _FULL_IP6 = /^[a-f\d]{1,4}([a-f\d]{1,4}){6}(:(\d{1,3}(\.\d{1,3}){3}(\/\d+)?|[a-f\d]{0,4}))$/i

/**
 * Truthy
 * @example
 * - true
 * - True
 * - TRUE
 * - 1
 * - +1
 * - 11
 * - +11
 */
export const _TRUE_LIKE = /^true|\+?[1-9]\d*$/i;

/**
 * ID
 * @example
 * - id
 * - id1
 * - id_1
 * - _
 * - _id
 * - _id1
 * - _id_1*
 */
export const _ID = /^[_a-z][_\w]*$/;

/**
 * URL
 */
export const _URL = /^(?:(?:([a-z]+:)\/\/)?([^.:/?]+(?:\.[^.:/?]+)*)?(?::(\d+))?)?((?:\.|\.\.(?:\/\.\.)*)?(?:\/[^?#\/]*)+)?(\?[^#]+)?(#.*)?$/;

export const _URLS = /(([a-z]+)?:\/\/(localhost|\d{1,3}(?:\.\d{1,3}){3}|\w+(?:\.\w+){1,})(?:\:(\d{1,5}))?(?:(\/[^/?#\s\n:]+)+)?(?:\?([^#\s\n]+))?(?:#([^\s\n]+))?)/g

/**
 * Host of URLS
 */
export const _HOST = /^(localhost|[^.:/?]+(?:\.[^.:/?]+)*)?(?::(\d+))?$/;

/**
 * snake_case
 */
export const _SNAKE_CASE = /^[_a-z][_a-z0-9]*$/;

/**
 * UPPER_SNAKE_CASE
 */
export const _UPPER_SNAKE_CASE = /^[_A-Z][_A-Z0-9]*$/;

/**
 * PascalCase
 */
export const _PASCAL_CASE = /^[A-Z][a-z\d]*([A-Z][a-z\d]*)*$/;

/**
 * camelCase
 */
export const _CAMEL_CASE = /^[a-z][a-z\d]*([A-Z][a-z\d]*)*$/;

/**
 * spinal-case
 */
export const _SPINAL_CASE = /^[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*$/;

/**
 * kebab-case
 * @alias _SPINAL_CASE
 */
export const _KEBAB_CASE = _SPINAL_CASE;