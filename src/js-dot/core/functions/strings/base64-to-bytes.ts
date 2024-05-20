export function base64ToBytes(base64String: string): Uint8Array {
	const key = atob(base64String);
	const end = key.length;
	const bytes = new Uint8Array(new ArrayBuffer(end));
	let current = -1;
	while (++current < end) {
		bytes[current] = key.charCodeAt(current);
	}

	return bytes;
}