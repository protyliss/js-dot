import {isNumber} from '../numbers/is-number';
import {getRelateProtocol} from './get-relate-protocol';

export function toWsUrl(value: number | string) {
    value = '' + value;

    const protocol = getRelateProtocol(value, 'ws') + '://';
    const delimiterIndex = value.indexOf('://');
    const segments = (
        delimiterIndex > -1 ?
            value.slice(delimiterIndex + 3) :
            value
    )
        .split('/');
    const hostName = segments.shift();
    const path = segments.join('/');

    let uri;

    if (isNumber(hostName)) {
        uri = `${protocol}${location.hostname}:${value}`;
    } else {
        uri = `${protocol}${hostName}`;
    }

    return path ?
        uri + '/' + path :
        uri;
}
