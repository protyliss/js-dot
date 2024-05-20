import {DotSetter} from '../../typings/dot-setter';
import {DotGetter} from '../../typings/dot-getter';

export function $id(value: string): DotSetter {
    return $ => $.forEach(idSetter, [value]);
}

function idSetter(value) {
    this.id = value;
}

export function id$(): DotGetter<string[]> {
    return $ => $.map(idGetter);
}

function idGetter() {
    return this.id;
}
