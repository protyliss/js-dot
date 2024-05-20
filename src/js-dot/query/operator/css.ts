import { DotGetter, DotSetter } from "@js-dot/query";

type DotCssShortenProperty =
    | 'bg'
    | 'bgc'
    | 'bd'
    | 'bds'
    | 'bdw'
    | 'bdr'
    | 'radius'

type DotCssExtendProperty = keyof CSSStyleDeclaration | DotCssShortenProperty;

type DotCssExtendValue = string
    | number
    | [number, number, number]
    | [number, number, number, number | string];

const CSS_SHORTEN_PROPERTIES: Record<DotCssShortenProperty, string> = {
    bg: 'background',
    bgc: 'backgroundColor',
    bd: 'border',
    bds: 'borderStyle',
    bdw: 'borderWidth',
    bdr: 'borderRadius',
    radius: 'borderRadius',
};

const _ENDS_WITH_COLOR = /color$/i;

/**
 * Set Element Style
 * @param properties
 */
export function $css(properties: Partial<Record<DotCssExtendProperty, DotCssExtendValue>>): DotSetter {
    const values: [string, string][] = [];
    const keys = Object.keys(properties);

    let current = keys.length;
    while (current-- > 0) {
        let key = keys[current];
        const property = CSS_SHORTEN_PROPERTIES[key] || key;
        let value = properties[key];

        if (_ENDS_WITH_COLOR.test(property)) {
            if (Array.isArray(value)) {
                const parts = [
                    colorPart(value[0]),
                    colorPart(value[1]),
                    colorPart(value[2])
                ];

                value = value.length > 3 ?
                    'rgba(' + parts.concat([alphaPart(value[3])]).join(', ') + ')' :
                    'rgb(' + parts.join(', ') + ')';
            }
        } else {
            switch (property) {
                case 'opacity':
                    value = alphaPart(value);
                    break;
            }
        }
        values.push([property, value]);
    }
    return $ => $.forEach(cssSetter, [values]);
}

function colorPart(value: number | string) {
    return isPercent(value) ?
        255 * (parseFloat(value) / 100) :
        value;
}

function alphaPart(value: number | string) {
    return isPercent(value) ?
        parseFloat(value) / 100 :
        value;
}

function isPercent(value: number | string): value is string {
    return typeof value === 'string' && value.indexOf('%') > -1;
}


function cssSetter(properties: [string, string | number][]) {
    const {style} = this;
    let current = properties.length;
    while (current-- > 0) {
        const [property, value] = properties[current];
        style[property] = value;
    }
}

/**
 * Get Element Style
 * @param property
 */
export function css$(property: DotCssExtendProperty): DotGetter<string[]> {
    property = CSS_SHORTEN_PROPERTIES[property] || property;
    return $ => $.map(cssGetter, [property]);
}

function cssGetter(property: keyof CSSStyleDeclaration) {
    return this.style[property];
}
