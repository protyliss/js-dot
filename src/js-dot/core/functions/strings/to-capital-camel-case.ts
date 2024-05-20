import {toCamelCase} from './to-camel-case';

export function toCapitalCamelCase(value: string){
    const camelCase = toCamelCase(value);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}
