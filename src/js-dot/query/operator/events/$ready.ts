import {DotSetter} from '../../typings/dot-setter';
import {$event} from '../event';

/**
 * Set 'DOMContentLoaded' Event
 * @param method
 */
export function $ready(method: () => void | boolean): DotSetter {
    return $ => $.pipe(
        $event('ready', method)
    );
}
