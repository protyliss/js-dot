import {$$event} from '../event';

export function $$ready(method) {
    return $ => $.pipe(
        $$event('ready', method)
    );
}
