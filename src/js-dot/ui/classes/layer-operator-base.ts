import {OverlayContainer, OverlayOperatorInterface, OverlayOption, OverlayStoreInterface} from '../typings/overlays';

export interface ElementPoolInterface<T> {
    /**
     * Prepend Element to Pool
     */
    prepend(): this;

    /**
     * Append Element to Pool
     * @param element
     */
    append(element): this;

    /**
     * Remove All Children
     * by remove self.
     */
    remove(): void;
}

export class LayerOperatorBase implements OverlayOperatorInterface {
    _pool: ElementPoolInterface<any>

    close(id_or_container): void {
    }

    open(id, container, option?: OverlayOption): void;
    open(element, option?: OverlayOption): void;
    open(id_or_element, element_or_option?, option?: OverlayOption): void {
        let id = id_or_element;
        let element = element_or_option;
        if (typeof id !== 'string') {
            option = element;
            element = id;
            id = null
        }

        this._pool.append(
            element
        );
    }

    remove() {
        this._pool.remove();
    }
}
