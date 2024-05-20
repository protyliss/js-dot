export const QUERY_KEYWORD_SPACE = '+';
export const QUERY_KEYWORD_OR = ',';
export const QUERY_KEYWORD_OR_CONTEXT = 'OR';
export const QUERY_KEY_VALUE_SEPARATOR = ':';
export const QUERY_KEY_AND = ';';

export const _QUERY_KEYWORD_OR_CONTEXT_WITH_SPACE = new RegExp(`\\s${QUERY_KEYWORD_OR_CONTEXT}\\s`, 'g');
export const _QUERY_KEYWORD_OR_AFTER_SPACE = new RegExp(`${QUERY_KEYWORD_OR}\\s*`, 'g');
export const _QUERY_SPACES = /\s+/g;


export const FILTER_CONDITION_AND = ';'
export const FILTER_CONDITION_OR = '/';
export const FILTER_KEYWORD_SPACE = '*'
export const FILTER_KEYWORD_OR = ',';
export const FILTER_KEYWORD_AND = ':'
export const FILTER_KEYWORD_OR_CONTEXT = 'OR'
export const FILTER_KEYWORD_AND_CONTEXT = 'AND'

export const _FILTER_KEYWORD_OR_CONTEXT = new RegExp(`\\s*${FILTER_KEYWORD_OR_CONTEXT}\\s*`, 'g');
export const _FILTER_KEYWORD_AND_CONTEXT = new RegExp(`\\s*${FILTER_KEYWORD_AND_CONTEXT}\\s*`, 'g');
