import {ExpressionType, getExpressionType} from './get-expression-type';

export function getExpressionTypes<T extends unknown[], V = T extends (infer U)[] ? U : never>(items: T): Record<keyof V, ExpressionType> {
    const {length} = items;

    if (length === 0) {
        return {} as any;
    }

    const types = {};
    let keys = Object.keys(items[0]);
    let current = -1;

    while (++current < length) {
        let currentKey = keys.length;
        const item = items[current];
        while (currentKey-- > 0) {
            const key = keys[currentKey];
            const type = getExpressionType(item[key]);

            if (type) {
                if (!types[key]) {
                    types[key] = [type];
                } else {
                    const target = types[key];
                    const hasIndex = target.indexOf(type);
                    if (hasIndex === -1) {
                        target[target.length] = type;
                    } else {
                        keys.splice(hasIndex, 1);
                    }
                }
            }
        }
    }

    keys = Object.keys(items[0]);
    current = keys.length;

    while (current-- > 0) {
        const key = keys[current];
        const type = types[key]
        types[key] = type ? type[0] : null;
    }

    return types as any;
}
