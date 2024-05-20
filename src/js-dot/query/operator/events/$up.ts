import {$event} from '../event';

export function $up(method) {
    return $ => $.pipe(
        $event('up', method)
    );
}
