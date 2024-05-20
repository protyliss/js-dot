import {combinates} from './combinates';
import {permute} from './permute';

export function permutes(item, ...moreItems) {
    const combinated = combinates(item, ...moreItems);
    const end = combinated.length;
    let result = [];
    let current = -1;

    while (++current < end) {
        const target = combinated[current];

        result = result.concat(
            target.length > 1 ?
                permute(target) :
                [target]
        );
    }

    return result;
}
