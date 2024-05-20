export function setCookie(name: string, value: number | string, path = '/') {
    document.cookie = `${name}=${value}; path=${path}`;
}
