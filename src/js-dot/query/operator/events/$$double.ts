import {$$event} from '../event';

export function $$double(method) {
    return $ => $.pipe(
        $$event('double', method)
    );
}
