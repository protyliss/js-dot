# @js-dot/data

| Name                                                          | Version                                        | Downloads                                       |
|---------------------------------------------------------------|------------------------------------------------|-------------------------------------------------|
| [@js-dot/__data__   ](https://npmjs.com/package/@js-dot/data) | ![](https://img.shields.io/npm/v/@js-dot/data) | ![](https://img.shields.io/npm/dm/@js-dot/data) |

Simple Data Restructuring

## Submodules

* @js-dot/data/__frame__
* @js-dot/data/__csv__
* @js-dot/data/__ini__

---

## Cheatsheet

//@formatter:off

## toRelate

### Before

Group Items:
```json
[
    { "primary": 1 },
    { "primary": 2 }
]
```

Related Items:

```json
[
    { "parent": 1  },
    { "parent": 2  }
]
```


### After

```json
[
    {
        "primary"     : 1,
        "items": [
            { "parent": 1 }
        ]
    },
    {
        "primary"     : 2,
        "items": [
            { "parent": 2 }
        ]
    }
]
```

---

### frameToXYSeriesSet

#### Before

```json
[
  ["date", "foo", "bar"],
  [     1,     2,     3],
  [     2,    20,    30]
]
```

#### After

```json
{
    "foo": {
        "x": [1,  2],
        "y": [2, 20]
    },
    "bar": {
        "x": [1,  3],
        "y": [2, 30]
    }
}
```

//@formatter:on