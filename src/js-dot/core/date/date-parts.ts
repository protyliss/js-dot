export class DateParts {
    y: string;
    m: string;
    d: string;
    h: string;
    i: string;
    s: string;
    u: string;
    t: number;

    constructor(date: Date = new Date) {
        this.y = ('' + date.getFullYear()).padStart(4, '0')
        this.m = ('' + (date.getMonth() + 1)).padStart(2, '0');
        this.d = ('' + date.getDate()).padStart(2, '0')
        this.h = ('' + date.getHours()).padStart(2, '0')
        this.i = ('' + date.getMinutes()).padStart(2, '0')
        this.s = ('' + date.getSeconds()).padStart(2, '0')
        this.u = ('' + date.getMilliseconds()).padStart(3, '0')

        const t = date.getTimezoneOffset()
        this.t = t ? t / -60 : 0;
    }
}