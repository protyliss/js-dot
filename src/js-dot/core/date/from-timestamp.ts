const _TIMESTAMP = /^(?:(\d{4})[-/.]?)?(?:(1[0-2]|0?[1-9])[-/.]?)?(3[01]|[12]\d|0?[1-9])(?:[\sT]?(2[0-3]|1\d|0?\d)(?::?([1-5]\d|0?\d)(?::?([1-5]\d|0?\d)(?:\.(\d+Z?)([+-]\d\d(?::\d\d)?)?)?)?)?)?$/

/**
 * Get Timestamp from Shorten Timestamp Expression
 * @description
 * Accept Expressions:
 * - y-m-d h:i:s
 * - y-m-d h:i
 * - y-m-d h
 * - y-m-d
 * - m-d
 * - d
 * - y-m-dTh:i:s
 * - y-m-dTh:i
 * - y-m-dTh
 * - digit
 * > `-` to compatible with '/' and '.'
 */
export function fromTimestamp(timestamp: string, forEnd?: boolean) {
    switch (timestamp) {
        case null:
        case undefined:
        case '':
            return null;
    }

    const matched = timestamp.match(_TIMESTAMP);
    if (!matched) {
        throw RangeError('Invalid Timestamp Expression: ' + timestamp);
    }

    const [_, y, m, d, h, i, s, u, t] = matched;

    const fixedM = m === undefined ?
        !y ?
            (new Date).getMonth() :
            forEnd ?
                11 :
                0 :
        +m - 1;

    return forEnd ?
        new Date(
            +y || (new Date).getFullYear(),
            fixedM,
            +d,
            h ? +h : 23,
            i ? +i : 59,
            s ? +s : 59,
            u ? +u : 999
        ) :
        new Date(
            +y || (new Date).getFullYear(),
            fixedM,
            +d,
            h ? +h : 0,
            i ? +i : 0,
            s ? +s : 0,
            u ? +u : 0
        )
}