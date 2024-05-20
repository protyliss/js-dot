import {DotGetter, DotSetter} from "@js-dot/query";

export function $attrib(name, value): DotSetter {
	return $ => {
		return $.forEach(attribSetter, [name, value]);
	}
}

export function attrib$(name): DotGetter<string[]> {
	return $ => {
		return $.map(attribGetter, [name]);
	}
}

function attribSetter(name, value) {
	this.setAttribute(name, value);
}

function attribGetter(name) {
	return this.getAttribute(name);
}
