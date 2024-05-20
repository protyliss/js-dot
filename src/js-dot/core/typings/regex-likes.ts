export type _D1_4 =
	| '1'
	| '2'
	| '3'
	| '4'

export type _D1_5 =
	| _D1_4
	| '4'
	;

export type _D1_9 =
	| _D1_5
	| '6'
	| '7'
	| '8'
	| '9'

export type _D0_4 =
	| '0'
	| _D1_4

export type _D0_5 =
	| '0'
	| _D1_5

export type _D =
	| '0'
	| _D1_9
	;

export type _DN2 = `${_D1_9}${_D}`;
export type _DN3 = `${_DN2}${_D}`;
export type _D255 =
	| _D
	| _DN2
	| `1${_D}${_D}`
	| `2${_D0_4}${_D}`
	| `25${_D0_5}`

export type Y =
	`${0 | 1 | 2}${_D}${_D}${_D}`;

export type M =
	| `${_D1_9}`
	| `1${0 | 1 | 2}`

export type D =
	| _D1_9
	| `${1 | 2}${_D}`
	| `3${0 | 1}`

export type H =
	| _D
	| `${0 | 1}${_D}`
	| `12`

export type I =
	| _D
	| `${_D0_4}${_D}`
	| `5${_D}`

export type S = I;

// @todo using ts 5
// export type YMD = `${Y}-${M}-${D}`;
// export type IP4 = `${_D255}.${_D255}.${_D255}.${_D255}`;