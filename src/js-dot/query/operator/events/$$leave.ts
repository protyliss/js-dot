import {$$event} from '../event';

export function $$leave(method) {
    return $ => $.pipe(
        $$event('leave', method)
    );
}
