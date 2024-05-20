export function bytesToHex(byteArray: Uint8Array): string {
    const result = [];
    const end = byteArray.length;
    let current = -1;
    while (++current < end) {
        const hex = byteArray[current].toString(16).toUpperCase();
        result[current] = hex.length === 1 ? '0' + hex : hex;
    }
    return result.join('');
}
