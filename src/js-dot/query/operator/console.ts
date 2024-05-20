import {DotSetter} from '@js-dot/query';

export function $log(): DotSetter {
	return $ => {
		this.forEach(log);
	}
}

export function $info(): DotSetter {
	return $ => {
		this.forEach(info);
	}
}

export function $debug(): DotSetter {
	return $ => {
		this.forEach(debug);
	}
}

function log() {
	console.log(this);
}

function debug() {
	console.debug(this);
}

function info() {
	console.info(this);
}
