import {$event} from '../event';

export function $click(method) {
    return $ => $.pipe(
        $event('click', method)
    );
}
