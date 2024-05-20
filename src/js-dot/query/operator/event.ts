type DotEventShortenType =
    | 'ready'
    | 'double'
    | 'over'
    | 'out'
    | 'up'
    | 'down'
    | 'press'
    | '^ani'
    | 'ani$'

type DotEventExtendType = DotEventShortenType
    |string

type DotEventFunction = (event: Event) => void | boolean;

const EVENT_SHORTEN_TYPES: Record<DotEventShortenType, string> = {
    'ready': 'DOMContentLoaded',
    'double': 'dbclick',
    'over': 'mouseover',
    'out': 'mouseout',
    'up': 'keyup',
    'down': 'keydown',
    'press': 'keypress',
    '^ani': 'animationstart',
    'ani$': 'animationend'
};

export function $event(type: DotEventExtendType, method: DotEventFunction) {
    type = EVENT_SHORTEN_TYPES[type] || type;

    return $ => {
        $.forEach(eventAddSetter, [type, method]);
    }
}

export function $$event(type: DotEventExtendType, method: DotEventFunction) {
    type = EVENT_SHORTEN_TYPES[type] || type;

    return $ => {
        $.forEach(eventRemoveSetter, [type, method]);
    }
}

function eventAddSetter(type, method) {
    let target = this;
    switch (type) {
        case 'load':
        case 'DOMContentLoaded':
            if (target === window) {
                target = document;
            }

            if (target.readyState !== 'loading') {
                return method(new Event(type));
            }
    }

    this.addEventListener(type, method);
}

function eventRemoveSetter(type, method) {
    let target = this;

    switch (type) {
        case 'load':
        case 'DOMContentLoaded':
            if (target === window) {
                target = document;
            }
    }

    this.removeEventListener(type, method);
}
