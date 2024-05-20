import {toFlat} from './arrays/to-flat';

export function permute(item: number | string | Array<number | string>, ...moreItems: Array<number | string>);
export function permute(item, ...moreItems) {
    const items = toFlat([item, moreItems]);

    const length = items.length;
    const result = [items.slice()];
    const count = (new Array(length) as any).fill(0);
    let index = 1;
    let moveTo;
    let current;

    while (index < length) {
        if (count[index] < index) {
            moveTo = index % 2 && count[index];
            current = items[index];
            items[index] = items[moveTo];
            items[moveTo] = current;
            count[index]++;
            index = 1;
            result.push(items.slice());
        } else {
            count[index] = 0;
            index++;
        }
    }
    return result;
}
