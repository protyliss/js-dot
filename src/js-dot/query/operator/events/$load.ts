import {$event} from '../event';

export function $load(method) {
    return $ => $.pipe(
        $event('load', method)
    );
}
