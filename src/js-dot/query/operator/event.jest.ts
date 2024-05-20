import {Dot} from '../classes/dot';
import {$$event, $event} from './event';

describe('event', () => {

    document.body.innerHTML = `<button id="target"></button>`;

    const button = document.getElementById('target');

    const $button = Dot.from(button);

    const waitHTML = 'wait';
    const clickedHTML = 'clicked';

    function onClick() {
        this.innerHTML = clickedHTML;
    }

    test('Set Click Event to Button', () => {
        button.innerHTML = waitHTML;

        $button.pipe($event('click', onClick));

        button.click();

        return expect(button.innerHTML).toBe(clickedHTML);
    });

    test('Remove Click Event to Button', () => {
        button.innerHTML = waitHTML;

        $button.pipe($$event('click', onClick));

        button.click();

        return expect(button.innerHTML).toBe(waitHTML);
    });
});
