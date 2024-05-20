export function byId(id: string): HTMLElement;
export function byId(parent: HTMLElement, id: string): HTMLElement
export function byId(parent_or_id, id?) {
    let parent = parent_or_id;
    if (!id) {
        id = parent as string;
        parent = null;

    }

    return (parent || document).getElementById(id);
}
