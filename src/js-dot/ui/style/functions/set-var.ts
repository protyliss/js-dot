/**
 * Set :root variable
 * @param name
 * @param value
 */
export function setVar(name: string, value: string | number)
/**
 * Set Element variable
 * @param element
 * @param name
 * @param value
 */
export function setVar(element: HTMLElement, name: string, value: string | number)
export function setVar(element_or_name: string | HTMLElement, name_or_value: string | number, value?: string | number) {
	let element = element_or_name as HTMLElement;
	let name    = name_or_value as string;
	if (typeof element_or_name === 'string') {
		value   = name_or_value;
		name    = element_or_name;
		element = document.documentElement;
	}
	if (!name.startsWith('--')) {
		name = '--' + name;
	}
	element.style.setProperty(name, value as string);
}