import {$$event} from '../event';

export function $$down(method) {
    return $ => $.pipe(
        $$event('down', method)
    );
}
