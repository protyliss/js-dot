export interface OverlayOption {
    width: number | string;
    height: number | string;
}

export interface OverlayOperatorInterface {
    /**
     * Open Overlay Container
     * Append Overlay Element to Pool
     * @param id
     * @param container
     * @param option
     */
    open(id, container, option?: OverlayOption): void;

    /**
     * Open Overlay Container
     * Append Overlay Element to Pool
     * @param container
     * @param option
     */
    open(container, option?: OverlayOption): void;

    open(id_or_container, container_or_option?, option?: OverlayOption): void;

    /**
     * Close Overlay Container
     * Remove Overlay Element from Pool
     * @param id_or_container
     */
    close(id_or_container): void;
}

export interface OverlayContainer {
    overlayId: string;

    focus(): void;
    close(): void;
}

export interface ResizableOverlayContainer {
    minimize(): void;

    maximize(): void;
}

export interface OverlayStoreInterface<T extends OverlayContainer = OverlayContainer> {
    has(id: string): boolean;

    get(id: string): any;

    opened(overlay: T): void;

    closed(overlay: T): void;
}
