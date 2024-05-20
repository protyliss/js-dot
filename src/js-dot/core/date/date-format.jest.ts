import {dateFormat} from './date-format';

describe('dateFormat', () => {
    const now = new Date;

    Object.entries({
        Y: () => ''+now.getFullYear(),
        H: () => zf(now.getHours()),

        y: () => ('' + now.getFullYear()).slice(2),
        m: () => zf(now.getMonth() + 1),
        d: () => zf(now.getDate()),
        h: () => zf(Math.floor(now.getHours() % 12)),
        i: () => zf(now.getMinutes()),
        s: () => zf(now.getSeconds()),
        Ym: () => ''+now.getFullYear() + zf(now.getMonth() + 1)
    }).forEach(
        ([formatting, returns]) => {
            test(formatting, () => {
                expect(
                    dateFormat(formatting, now)
                )
                    .toBe(
                        returns()
                    )
            });
        }
    );
});

function zf(value: number) {
    return value < 10 ?
        '0' + value :
        '' + value;
}
