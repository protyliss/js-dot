export function toFixedRange(value: number, max: number);
// tslint:disable-next-line:unified-signatures
export function toFixedRange(value: number, min: number, max: number);
export function toFixedRange(value, min, max?) {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    return value < min ?
        min :
        value > max ?
            max :
            value;
}
