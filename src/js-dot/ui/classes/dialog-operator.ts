import {OverlayContainer, OverlayOperatorInterface, OverlayStoreInterface} from '../typings/overlays';
import {OverlayStore} from './overlay-store';
import {ElementPoolInterface} from './layer-operator-base';
import {byId} from '../functions/by-id';

export interface DialogOption {
    width: number | string;
    height: number | string;
}

export class DialogOperatorBase implements OverlayOperatorInterface {
    protected _store: OverlayStoreInterface;
    protected _pool: ElementPoolInterface<any>;

    constructor(store?: OverlayStoreInterface) {
        if (!store) {
            store = new OverlayStore();
        }

        this._store = store;
    }

    open(id, container, option?: DialogOption): void;

    open(container, option?: DialogOption): void;
    open(id_or_container, container_or_option?, option?: DialogOption): void;
    open(id, container?: DialogOption, option?: DialogOption): void {
        if (typeof id !== 'string') {
            option = container;
            container = id;
            id = null;
        }

        if (id) {
            const opened = this._store.get(id)
            if (opened) {
                opened.focus();
                return;
            }
        }

        this._pool.append(container)
    }

    close(id_or_container: string | OverlayContainer): void {
        if (typeof id_or_container === 'string') {
            const container = this._store.get(id_or_container)
            if (container) {
                container.close();
            }
        } else {
            id_or_container.close();
        }
    }

}

export class DialogOperator extends DialogOperatorBase {
    _append(id: string) {
        (new DialogContainer(id)).open();
    }
}

export class DialogContainer {
    protected _node: HTMLElement;

    constructor(id: string) {
        this._node = byId(id);
    }

    open() {
        this._node.style.display = 'block';
    }

    close(){
        this._node.style.display = 'none';
    }
}
