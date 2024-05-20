export function toRegex(pattern: string, flags?: string) {
    const _ALL = /([+?*\[\]()])/g;

    // @ts-ignore
    return (toRegex = function (pattern, flags) {
        return new RegExp(
            pattern.replace(_ALL, '\\\\$1'),
            flags
        );
    }).apply(this, arguments);
}

