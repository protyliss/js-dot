import {$$event} from '../event';

export function $$enter(method) {
    return $ => $.pipe(
        $$event('enter', method)
    );
}
