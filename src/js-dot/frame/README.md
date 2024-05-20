# @js-dot/frame

| Name                                                            | Version                                        | Downloads                                        |
|-----------------------------------------------------------------|------------------------------------------------|--------------------------------------------------|
| [@js-dot/__frame__   ](https://npmjs.com/package/@js-dot/frame) | ![](https://img.shields.io/npm/v/@js-dot/core) | ![](https://img.shields.io/npm/dm/@js-dot/frame) |

Makes Framework

## Submodules

* @js-dot/frame/__template__

---

## rely

`rely` is dependency injection like `inject` as commonly in other module.
Makes easy singleton patterns without change original source as simply explain.

```js
class Foo {}

const a = rely(Foo);
const b = rely(Foo);

console.assert(a === b, 'a and b is not a same instance');
```

`relyify` and `relify` are compound word of `rely` + `-ify`,  mean to make something available to `rely` function.

```js
class Foo {}
class Bar {}

// make Foo `rely-ify` as Bar
relyify({token: Foo, class: Bar});

const a = rely(Foo);
const b = rely(Bar);

console.assert(a === b, 'a and b is not a same instance')
```

Use `relyify` to `rely` anything.

```js
relyify({
    token: 'foo',
    value: 1,
    // this option makes token 'foo' as available to re-rely-ify
    override: true
});

// Returns 1
let foo = rely('foo');

relyify({
    token: 'foo',
    value: 2
});

// Returns 2
foo = rely('foo');
```