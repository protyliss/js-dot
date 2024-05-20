import {$event} from '../event';

export function $press(method) {
    return $ => $.pipe(
        $event('press', method)
    );
}
