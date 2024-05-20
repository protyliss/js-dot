# @js-dot/query

DOM Control

* Designed for '|>' operator,
* Designed for Tree-shaking of Bundler

## Overview

```js

const body = new Dot('body')

// set body[style=margin:0]

body.pipe($css('margin', 0));

// get
const margin = body.pipe(css$('margin'));

```

## Pipe Operators

The `$` in the Operator's Name has an abbreviated meaning

* `$*`: Property __Setter__
* `$$*`: Property __Remover__
* `*$`: Property __Getter__
* `*$$`: Property __Contains__

### Index

| Operator | Usage           |
|----------|-----------------|
| $attrib  | *[] Setter      |
| attrib$  | *[] Getter      |
| $css     | *[style] Setter |
| css$     | *[style] Getter |
| $class   | *[class] Setter |
| class$   | *[class] Getter |
| $event   | *[on*] Setter   |
| $$event  | *[] Remover     |
