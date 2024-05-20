/**
 * String transform to `snake_case`
 * @param value
 */
import {toKebabCase} from './to-kebab-case';

const _HYPHEN = /-/g;
export function toSnakeCase(value: string | string[]) {
    return toKebabCase(value).replace(_HYPHEN, '_');
}
