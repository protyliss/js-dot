import {_DIGIT_TIMESTAMP} from './_digit-timestamp';

export function isDateDigit(dateDigit: number | string): false | string[] {
    switch(typeof dateDigit){
        case 'number':
        case 'string':
            const matched = (''+dateDigit).match(_DIGIT_TIMESTAMP);
            return matched || false;
    }
    return false;
}
