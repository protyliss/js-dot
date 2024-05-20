import {Dot} from '../../classes/dot';
import {DotGetter} from '../../typings/dot-getter';

export function child$(selector: string): DotGetter {
    return $ => {
        return new Dot($.nodes, selector);
    }
}
