import {DotGetter} from '../../typings/dot-getter';
import {DotSetter} from '../../typings/dot-setter';

export function $data(name: string, value: string | number): DotSetter {
	return $ => $.forEach(dataSetter, [name, value]);
}

function dataSetter(this: HTMLElement, name: string, value: string | number) {
	this.dataset[name] = value as string;
}

export function data$(name): DotGetter<string[]> {
	return $ => $.map(dataGetter, [name]);
}

function dataGetter(this: HTMLElement, name: string) {
	return this.dataset[name];
}

