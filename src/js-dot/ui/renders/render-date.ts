/**
 * Render Date to <time> string
 * @param value
 */
export function renderDate(value: number | string | Date) {
    const date = value instanceof Date ? value : new Date(value);

    if (isNaN(date.getTime())) {
        return '';
    }

    const y = '' + date.getFullYear();
    const m = zerofill(date.getMonth() + 1);
    const d = zerofill(date.getDate());
    const h = zerofill(date.getHours());
    const i = zerofill(date.getMinutes());
    const s = zerofill(date.getSeconds());
    const datetime = `${y}-${m}-${d} ${h}:${i}:${s}`;
    const title = date.toLocaleString();
    return [
        `<time class="timestamp" datetime="${datetime}" title="${title}">`,
            `<span class="y">`,
                `<var class="y-prefix">${y.substr(0, 2)}</var>`,
                `<var class="y-suffix">${y.slice(2)}</var>`,
            `</span>`,
            `<span class="m"><span>-</span><var>${m}</var></span>`,
            `<span class="d"><span>-</span><var>${d}</var></span>`,
            `<span class="h"><span>&nbsp;</span><var>${h}</var></span>`,
            `<span class="i"><span>:</span><var>${i}</var></span>`,
            `<span class="s"><span>:</span><var>${s}</var></span>`,
        `</time>`
    ].join('');
}

function zerofill(value) {
    return value < 10 ? '0' + value : value;
}
