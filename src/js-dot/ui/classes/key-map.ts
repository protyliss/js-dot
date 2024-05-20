const SHORTEN_KEYS = {
    'esc': 'escape'
};

export class KeyMap {
    protected _container: HTMLElement;
    protected _selfKeyUp = this._keyUp.bind(this);

    protected _callbacks: Record<string, KeyMapListener[]> = {};
    protected _count = 0;

    constructor(container?: HTMLElement) {
        if (!container) {
            container = document.body;
        }

        this._container = container;

    }

    protected _keyUp(event: KeyboardEvent) {
        const target = event.target as HTMLElement;

        switch (target.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                if ((target as HTMLInputElement).value) {
                    return;
                }
            case 'SELECT':
                if ((target as HTMLSelectElement).selectedIndex) {
                    return;
                }
        }

        const key = event.key.toLowerCase();

        const {_callbacks} = this;
        const callbacks = _callbacks[key];

        if (callbacks && callbacks.length) {
            const callback = callbacks.pop();
            callback.callback();
            this._decrease();
        }
    }

    protected _increase() {
        if (this._count === 0) {
            this._container.addEventListener('keyup', this._selfKeyUp);
        }

        this._count++;
    }

    protected _decrease() {
        this._count--;

        if (this._count === 0) {
            this._container.removeEventListener('keyup', this._selfKeyUp);
        }
    }

    add(key: string, callback: Function) {
        key = SHORTEN_KEYS[key] || key;

        const {_callbacks} = this;


        const listener = new KeyMapListener(this, key, callback);

        if (!_callbacks[key]) {
            _callbacks[key] = [listener];
        } else {
            const callbacks = _callbacks[key];
            callbacks[callbacks.length] = listener;
        }

        this._increase();

        return listener;
    }

    remove(listener: KeyMapListener) {
        const {key} = listener;

        const {_callbacks} = this;

        const callbacks = _callbacks[key];
        if (!callbacks) {
            return this;
        }

        const index = callbacks.indexOf(listener);
        if (index > -1) {
            callbacks.splice(index, 1);
            this._decrease();
        }

        return this;
    }
}

export class KeyMapListener {
    constructor(protected _keyMap: KeyMap,
                public key: string,
                public callback: Function
    ) {
    }

    remove() {
        this._keyMap.remove(this);
    }
}
