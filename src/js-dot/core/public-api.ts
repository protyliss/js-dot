// public-api.ts
/**
 * @module .
 */

export * from './typings/public-api-index';

export * from './constants/regex';

export * from './functions/public-api-index';

export * from './functions/booleans/is-boolean-string';
export * from './functions/booleans/to-boolean';

export * from './functions/colors/parse-color';
export * from './functions/colors/to-rgb';
export * from './functions/colors/to-rgba';

export * from './functions/events/stop';

export * from './functions/numbers/is-number';
export * from './functions/numbers/is-numeric';
export * from './functions/numbers/to-byte-format';
export * from './functions/numbers/to-fit';
export * from './functions/numbers/to-fixed-range';
export * from './functions/numbers/zerofill';

export * from './functions/gps/get-distance';
export * from './functions/objects/flatten';
export * from './functions/objects/fusion';
export * from './functions/objects/object-clone';
export * from './functions/objects/extract';
export * from './functions/objects/get-expression-type';
export * from './functions/objects/get-expression-types';
export * from './functions/objects/get-first-key';
export * from './functions/objects/is-empty';
export * from './functions/objects/is-false-like';
export * from './functions/objects/is-object';
export * from './functions/objects/non-nullable';
export * from './functions/objects/object-extract-map';
export * from './functions/objects/path-walk';

export * from './functions/routes/add-search-string-value';
export * from './functions/routes/from-search-string';
export * from './functions/routes/from-filter-string';
export * from './functions/routes/from-usv-object';
export * from './functions/routes/to-usv-string';
export * from './functions/routes/to-url';
export * from './functions/routes/get-path-class';
export * from './functions/routes/get-search-string-value';
export * from './functions/routes/get-relate-protocol';
export * from './functions/routes/multiple-path';
export * from './functions/routes/to-filter-string';
export * from './functions/routes/to-ws-url';
export * from './functions/routes/update-usv-object';
export * from './functions/routes/update-usv-string';
export * from './functions/routes/formalize-url-host';
export * from './functions/routes/formalize-url-path';
export * from './functions/routes/get-search-string-value';
export * from './functions/routes/multiple-path';

export * from './functions/stores/get-cookie';
export * from './functions/stores/set-cookie';

export * from './functions/strings/base64-to-bytes';
export * from './functions/strings/base64-to-hex';
export * from './functions/strings/casting';

export * from './functions/strings/parse-agent';
export * from './functions/strings/parse-url';
export * from './functions/strings/start-at';
export * from './functions/strings/strip-tag';
export * from './functions/strings/strip-comment-for-json';
export * from './functions/strings/to-camel-case';
export * from './functions/strings/to-capital-case';
export * from './functions/strings/to-kebab-case';
export * from './functions/strings/to-regex';
export * from './functions/strings/to-snake-case';
export * from './functions/strings/glob-to-regex';
export * from './functions/strings/has-glob';

export * from './functions/check-interval';
export * from './functions/check-timeout';
export * from './functions/combinates';

export * from './functions/is-promise';
export * from './functions/callify';
export * from './functions/callbackify';
export * from './functions/promisify';

export * from './functions/permute';
export * from './functions/permutes';
export * from './functions/random';
export * from './functions/sleep';

export * from './classes/public-api-index';
export * from './view/public-api';

export * from './decorators/only-one';
export * from './decorators/debounce';
export * from './decorators/throttle';

//////////////////////////////
// Deprecates
//
// import {getArray} from './functions/arrays/get-array';
// import {getCount} from './functions/arrays/get-count';
// import {getLast} from './functions/arrays/get-last';
// import {getNumbers} from './functions/arrays/get-numbers';
// import {getSum} from './functions/arrays/get-sum';
// import {toFilled} from './functions/arrays/to-filled';
// import {toFlat} from './functions/arrays/to-flat';
// import {toNumber} from './functions/arrays/to-number';
// import {toPrefixWith} from './functions/arrays/to-prefix-with';
// import {toShuffle} from './functions/arrays/to-shuffle';
// import {toSuffixWith} from './functions/arrays/to-suffix-with';
// import {toUnique} from './functions/arrays/to-unique';
// import {toWrapString} from './functions/arrays/wrap-strings';
// import {fusion} from './functions/objects/fusion';
// import {pathWalk} from './functions/objects/path-walk';
// import {renamedTo} from './functions/renamed-to';
//
// /**
//  * @deprecated
//  * @see pathWalk
//  */
// export const walk          = renamedTo('walk', pathWalk);
// /**
//  * @deprecated
//  * @see fusion
//  */
// export const merge         = renamedTo('merge', fusion);
// /**
//  * @deprecated
//  * @see getArray
//  */
// export const arrayMake     = renamedTo('arrayMake', getArray);
// /**
//  * @deprecated
//  * @see getNumbers
//  */
// export const arrayNumbers  = renamedTo('arrayNumbers', getNumbers);
// /**
//  * @deprecated
//  * @see getCount
//  */
// export const arrayCount    = renamedTo('arrayCount', getCount);
// /**
//  * @deprecated
//  * @see getLast
//  */
// export const arrayLast     = renamedTo('arrayLast', getLast);
// /**
//  * @deprecated
//  * @see getSum
//  */
// export const arraySum      = renamedTo('arraySum', getSum);
// /**
//  * @deprecated
//  * @see toFilled
//  */
// export const arrayNotEmpty = renamedTo('arrayNotEmpty', toFilled);
// /**
//  * @deprecated
//  * @see toFlat
//  */
// export const arrayFlat     = renamedTo('arrayFlat', toFlat);
// /**
//  * @deprecated
//  * @see toNumber
//  */
// export const arrayToNumber = renamedTo('arrayToNumber', toNumber);
// /**
//  * @deprecated
//  * @see toPrefixWith
//  */
// export const arrayPrefix   = renamedTo('arrayPrefix', toPrefixWith);
// /**
//  * @deprecated
//  * @see toSuffixWith
//  */
// export const arraySuffix   = renamedTo('arraySuffix', toSuffixWith);
// /**
//  * @deprecated
//  * @see toShuffle
//  */
// export const arrayShuffle  = renamedTo('arrayShuffle', toShuffle);
// /**
//  * @deprecated
//  * @see toUnique
//  */
// export const arrayUnique   = renamedTo('arrayUnique', toUnique);
// /**
//  * @deprecated
//  * @see toWrapString
//  */
// export const arrayWrap     = renamedTo('arrayWrap', toWrapString);

//
// /**
//  * @deprecated
//  * @see import('@js-dot/data/csv').CsvEncodeOption
//  */
// export type CsvEncodeOption = DATA_CSV.CsvEncodeOption<any>;
// /**
//  * @deprecated
//  * @see import('@js-dot/data/csv').CSV.stringify
//  */
// export const csvEncode = movedTo(DATA_CSV.CSV.stringify, 'csvEncode');
//
// /**
//  * @deprecated
//  * @see import('@js-dot/data/csv').CSV.stringify
//  */
// export const csvEncodeFromObject = movedTo(DATA_CSV.CSV.stringify, 'csvEncodeFromObject');
//
// /**
//  * @deprecated
//  * @see import('@js-dot/data/csv').CSV.stringify
//  */
// export const csvEncodeFromArray = movedTo(DATA_CSV.CSV.stringify, 'csvEncodeFromArray');
//
// /**
//  * @deprecated
//  * @see import('@js-dot/data/csv').CSV.parse
//  */
// export const csvDecode = movedTo(DATA_CSV.CSV.parse, 'csvDecode');
//
// /**
//  * @deprecated
//  * @see import('@js-dot/data/csv').CSV.parse
//  */
// export const csvDecodeToArray = movedTo((DATA_CSV.CSV).parse, 'csvDecodeToArray');
