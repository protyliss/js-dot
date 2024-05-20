import {HttpHeaders} from '../classes/http-headers';

/**
 * Http Request Method
 */
export type HttpMethod =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'PATCH'
	| 'DELETE'
	;

/**
 * Http Request Credential
 */
export type HttpCredentials =
	| 'omit'
	| 'same-origin'
	| 'include'
	;

/**
 * Http Request Parameter Type with Parent Requester Parameters
 */
export type HttpPath<PARENT_PARAMETERS, CHILD_PARAMETERS> =
	PARENT_PARAMETERS extends undefined | null ?
		CHILD_PARAMETERS extends undefined | null ?
			null | undefined :
			CHILD_PARAMETERS :
		CHILD_PARAMETERS extends undefined | null ?
			PARENT_PARAMETERS :
			PARENT_PARAMETERS & CHILD_PARAMETERS;

/**
 * Default Http Request Parameter type for formalize coding
 */
export type HttpDefaultParameters = unknown;

/**
 * Default Http Request Body type for formalize coding
 */
export type HttpDefaultBody =
	| null
	| undefined
	| number
	| string
	| boolean
	| any[]
	| Record<string, number | string>
	| FormData;

/**
 * Default Http Response Body type for formalize coding
 */
export type HttpDefaultResponse = any;

export interface HttpOption {
	method: HttpMethod,
	headers: HttpHeadersInit,
	accept: string,
	body: any;
	parameters: Record<string, any>;
	credentials: HttpCredentials;

	/**
	 * Optional Values
	 */
	[K: string]: any;

	/**
	 * @protected
	 */
	$duplicated: boolean;

	/**
	 * @author 230719 kdh
	 * 파라미터 케이스를 변경할 필요가 있어 추가함
	 */
	caseAs?: 'kebab-case' | 'camelCase' | 'snake_case';
}

export type HttpHeadersInit = HttpHeaders | string[][] | Record<string, string>;

/**
 * @inheritDoc
 */
export interface HttpHeadersInterface extends Headers {
	append(name: string, value: string): void;

	delete(name: string): void;

	get(name: string): string | null;

	has(name: string): boolean;

	set(name: string, value: string): void;

	forEach(callback: (value: string, key: string, parent: HttpHeadersInterface) => void, thisArg?: any): void;
}
