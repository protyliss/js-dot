import {$append, $tag} from '@js-dot/ui';

/**
 * Submit Object as FORM and INPUT
 * @param method FORM[method]
 * @param action FORM[action]
 * @param values FORM.elements
 */
export function nativeSubmit(method: 'get' | 'post', action: string, values: Record<string, any>): Promise<never> {
    const {isArray: IS_ARRAY} = Array;
    const {keys: KEYS} = Object;
    const style = {
        display: 'none'
    };

    // @ts-ignore
    return (nativeSubmit = function (method, action, values) {
        return new Promise((resolve, reject) => {
            $append(
                $tag(
                    'iframe',
                    {
                        name: '_dot-' + Date.now(),
                        src: 'about:blank',
                        onload: addForm,
                        style,
                        _dotNativeSubmit: {
                            method,
                            action,
                            values,
                            reject,
                            resolve
                        }
                    }
                )
            );
        });
    }).apply(this, arguments);

    /**
     * @this {HTMLIFrameElement}
     */
    function addForm() {
        const {method, action, values} = this['_dotNativeSubmit'];
        const form = $tag(
            'form',
            {
                method,
                action,
                target: this.name,
                style
            }
        );

        const keys = KEYS(values);
        const end = keys.length;
        let current = -1;
        while (++current < end) {
            const key = keys[current];
            addInput(form, key, values[key]);
        }

        this['_dotNativeSubmit'].form = form;
        this.onload = onLoad;
        this.onerror = onLoad;

        ($append(form) as HTMLFormElement).submit();
    }

    function addInput(form, name, value) {
        // noinspection FallThroughInSwitchStatementJS
        switch (typeof value) {
            case undefined:
                value = null;
            case null:
            case 'boolean':
                value = value.toString();
            case 'string':
            case 'number':
                break;
            case 'object':
                if (IS_ARRAY(value)) {
                    const {length} = value;
                    let current = -1;
                    while (++current < length) {
                        addInput(form, `${name}[${current}]`, value[current]);
                    }
                    return;
                } else if (value.constructor.name === 'Object') {
                    const keys = KEYS(value);
                    const {length} = keys;
                    let current = -1;
                    while (++current < length) {
                        const key = keys[current];
                        addInput(form, `${name}[${key}]`, value[key]);
                    }
                    return;
                } else {
                    value = value.toString();
                }
        }

        return $append(form, $tag('input', {name, value}))
    }

    function onLoad() {
        const {form, resolve, reject} = this['_dotNativeSubmit'];
        remove(form);
        remove(this);
        resolve();
    }

    function remove(node) {
        node.parentNode.removeChild(node);
    }
}
