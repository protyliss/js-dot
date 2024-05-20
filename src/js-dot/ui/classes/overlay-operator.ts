import {OverlayOperatorInterface, OverlayOption} from '../typings/overlays';

export class OverlayOperator implements OverlayOperatorInterface {
    open(id_or_container, option?: OverlayOption): void {
    }

    close(...id_or_containers): void {
    }
}
