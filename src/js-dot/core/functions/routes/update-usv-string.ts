import {toUsvString} from './to-usv-string';
import {updateUsvObject} from './update-usv-object';

export function updateUsvString(queryString: string, source?): string;
// tslint:disable-next-line:unified-signatures
export function updateUsvString(queryArray: string[], source?): string;
// tslint:disable-next-line:unified-signatures
export function updateUsvString(queryMap: Record<string, string | number>, source?): string;
export function updateUsvString(string_or_array_or_map, source?): string {
	return toUsvString(
		updateUsvObject.apply(this, arguments)
	);
}
