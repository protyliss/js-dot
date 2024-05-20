# @js-dot/api

## @js-dot/api/http

REST API Design Pattern

* Designed for `|>` operator of future specification,
* Designed for Tree-shaking of Bundler

### Overview

`Promise` and `fetch`

```js
import {FetchHttp} from './js-dot/api/public-api.js';

// REST API Root
const $root = new FetchHttp('/examples')

// POST /examples
const $create = $root.post();

// GET /examples
const $reads = $create.get();

// POST /examples/:primaryKey?contentType
const $read = $create.get('/:primaryKey?contentType');

// PATCH /examples/:primaryKey
const $update = $read.patch();

// DELETE /examples/:primaryKey
const $delete = $read.delete();

// GET /examples/1?contentType=text
$read.request({
	// set path parameter value
	primaryKey: 1,
	// set search string value
	$contentType: 'text'
})
	.then(response => {
		console.log(response);
	});
```
