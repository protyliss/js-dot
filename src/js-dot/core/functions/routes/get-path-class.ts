import {isNumber} from '../numbers/is-number';
import {startAt} from '../strings/start-at';

export function getPathClass(
    url: string,
    {prefix, delimiter, wildcard}: Partial<{ prefix: string, delimiter: string, wildcard: string }> = {}
): string[] {
    if (!prefix) {
        prefix = 'path';
    }

    if (!delimiter) {
        delimiter = '_';
    }

    if (!wildcard) {
        wildcard = 'any'
    }

    url = startAt(url, '://');

    if(url.startsWith('/')){
        url = url.slice(1);
    }

    const searchStringIndex = url.indexOf('?');
    if (searchStringIndex > -1) {
        url = url.substr(0, searchStringIndex);
    }

    const segments = (url || 'index').split('/');
    const end = segments.length;
    const classNames = [];
    let current = -1;

    const lastClassNames = [prefix]
    while (++current < end) {
        const segment = segments[current];

        let lastCurrent = lastClassNames.length;
        while (lastCurrent-- > 0) {
            const lastClassName = lastClassNames[lastCurrent];
            let className = lastClassName + delimiter + segment;
            classNames[classNames.length] = className;
            lastClassNames[lastCurrent] = className;

            if (isNumber(segment)) {
                className = lastClassName + delimiter + wildcard;
                classNames[classNames.length] = className;
                lastClassNames[lastClassNames.length] = className;
            }
        }
    }

    return classNames;
}
