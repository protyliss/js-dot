import {OverlayContainer, OverlayStoreInterface} from '../typings/overlays';

export class OverlayStore<T extends OverlayContainer = OverlayContainer> implements OverlayStoreInterface<T> {
    protected _overlays: Record<string, T> = {};

    has(id: string): boolean {
        return !!this._overlays[id];
    }

    get(id: string): any {
        return this._overlays[id];
    }

    opened(overlay: T): void {
        this._overlays[overlay.overlayId] = overlay;
    }

    closed(overlay: T): void {
        delete this._overlays[overlay.overlayId];
    }

}
