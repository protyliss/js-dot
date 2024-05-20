export function isBooleanString(value: string) {
    switch (value) {
        case 'true':
        case 'True':
        case 'TRUE':
        case 'false':
        case 'False':
        case 'FALSE':
            return true;
    }
    return false;
}
