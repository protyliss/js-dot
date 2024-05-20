/**
 * Event Stop
 * @param event
 */
export function stop(event: Event){
    event.preventDefault();
    event.stopPropagation();
    return false;
}