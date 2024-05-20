import {casting} from '@js-dot/core';

export interface CsvEncodeOption<T> {
	includes: Array<keyof T | string>;
	excludes: Array<keyof T | string>;
	unpacks: Partial<Record<keyof T, Record<string, string>>>;
	map: (item: T) => any;
}

interface CsvEncodeObjectOption<T> extends CsvEncodeOption<T> {
	useHeader: boolean;
}

type CsvValue = number | string | boolean;

/**
 * The CSV namespace object contains static methods for parsing values from and converting values to CSV File
 *
 * @description
 * Supports:
 * - [ ] parse
 * - [ ] stringify
 */
export abstract class CSV {
	static parse(csvString: string): Array<Array<string | number | boolean>> {
		const rows  = [];
		const end   = csvString.length;
		let current = -1;

		let char;
		let row  = [];
		let cell = '';

		while (++current < end) {
			char = csvString.charAt(current);
			switch (char) {
				case '"':
					dq:
						while (++current < end) {
							char = csvString.charAt(current);

							switch (char) {
								case '"':
									break dq;

								case '\\':
									if (csvString.charAt(current + 1) === '"') {
										current++;
										cell += '"';
										break;
									}
								default :
									cell += char;
							}

						}
					break;

				case '\r':
					break;

				case '\n':
					row.push(casting(cell.trim()));
					cell = '';

					rows.push(row);
					row = [];
					break;

				case ',':
					row.push(casting(cell.trim()));
					cell = '';
					break;

				default:
					cell += char;
			}
		}

		if (cell) {
			row.push(cell.trim());
		}

		if (row.length) {
			rows.push(
				row
			);
		}

		return rows;
	}

	/**
	 * Get CSV String from 2d Array
	 * @param items
	 * @param option
	 */
	static stringify(items: Array<Array<CsvValue>>, option?: Partial<CsvEncodeOption<number>>): string;
	/**
	 * Get CSV String from Object Array
	 * @param items
	 * @param option
	 */
	static stringify<T extends {}>(items: Array<T>, option?: Partial<CsvEncodeObjectOption<T>>): string;
	static stringify(items: any[], option: Partial<CsvEncodeOption<any>> = {}) {
		const first = items[0];

		if (typeof first === 'object') {
			return csvEncodeFromObject(items, option);
		}

		if (Array.isArray(items)) {
			return csvEncodeFromArray(items, option);
		}

		throw new Error('Not Implemented');
	}
}


export function csvEncodeFromArray(items: any[], option: Partial<CsvEncodeOption<CsvValue>> = {}): string {
	const {includes, excludes} = option;

	return '';
}

function nothingMapFunction(item) {
	return item;
}

export function csvEncodeFromObject<T extends {}>(items: Array<T>, option: Partial<CsvEncodeObjectOption<T>> = {}): string {
	const fullOption                     = {
		unpacks: {},
		includes: [],
		...(option || {})
	};
	const {excludes, unpacks, useHeader} = fullOption;
	let {includes}                       = fullOption;

	let end;
	let current = -1;

	const map = option.map || nothingMapFunction;

	end     = items.length;
	current = -1;

	const first = items[0];

	if (!includes || !includes.length) {
		if (excludes) {
			let excludesCurrent = excludes.length;
			while (excludesCurrent-- > 0) {
				const exclude = excludes[excludesCurrent];
				if (first.hasOwnProperty(exclude)) {
					delete first[exclude as any];
				}
			}
		}

		includes = Object.keys(first) as Array<keyof T>;
	}

	const headers = [...includes];

	const unpackConfigures: Record<string, { properties: string[], length: number }> = {};
	if (unpacks) {
		const unpackTargets = Object.keys(unpacks);
		current             = unpackTargets.length;

		while (current-- > 0) {
			const unpackTarget = unpackTargets[current];
			const headerIndex  = headers.indexOf(unpackTarget);
			if (headerIndex > -1) {
				const unpack           = unpacks[unpackTarget];
				const unpackProperties = Object.keys(unpack);

				unpackConfigures[unpackTarget] = {
					properties: unpackProperties.reverse(),
					length: unpackProperties.length
				};

				headers.splice(
					headerIndex,
					1,
					...Object.values(unpack) as any
				);
			}
		}
	}

	const includeEnd = headers.length;
	let includeCurrent;

	const lines = [];

	if (useHeader !== false) {
		lines.push(headers.join(','));
	}

	const _escapes     = /[\s\t\n\r,]/;
	const _doubleQuote = /"/g;

	while (++current < end) {
		const item = map(items[current]);
		const line = [];

		includeCurrent = -1;

		while (++includeCurrent < includeEnd) {
			const include = includes[includeCurrent];

			let value = item[include];

			const type   = typeof value;
			const unpack = unpacks[include as string];

			if (
				(
					type === 'object'
					&& (value !== null && value !== undefined && !Array.isArray(type))
				)
				|| unpack
			) {
				if (!unpack) {
					continue;
				}

				if (!value) {
					value = {};
				}

				const {properties, length} = unpackConfigures[include as string];
				let unpackCurrent          = length;

				while (unpackCurrent-- > 0) {
					line.push(value[properties[unpackCurrent]] || '');
				}

				continue;
			}

			switch (type) {
				case 'string':
					if (_escapes.test(value)) {
						value = value.replace(_doubleQuote, '\\"') as any;
						value = '"' + value + '"' as any;
					}
					break;
				default:
					if (Array.isArray(value)) {
						value = '"' + value.join(',') + '"';
					}
			}

			line.push(value);
		}
		lines.push(line.join(','));
	}

	return lines.join('\n');
}
