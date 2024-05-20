/**
 * Add capacity unit from bytes
 * @param bytes
 * @param decimals
 */
export function toByteFormat(bytes: number, decimals: number): string {
    const {floor, log, pow} = Math;

    const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const BLOCK = 1024;
    const BLOCK_LOG = log(BLOCK);

    // @ts-ignore
    return (toByteFormat = function (bytes, decimals = 2) {
        if (!bytes) {
            return '0 ' + UNITS[0];
        }

        const level = floor(log(bytes) / BLOCK_LOG);
        return (+(bytes / pow(BLOCK, level)).toFixed(decimals)) + UNITS[level];
    }).apply(this, arguments);
}
