/**
 * Create <P&gt; element by Over 2 Line Break
 */
export function renderParagraph(text: string) {
    const P_SEPARATOR = /[\n\r][\t\s]*[\n\r][\n\r\t\s]*/g;
    const BR_SEPARATOR = /[\n\r][\t\s]*/g;
	const SPACE = /(\t+)/g;
    // @ts-ignore
    return (renderParagraph = function(text){
        if (!text || !text.length) {
            return '';
        }

		text = text.replace(SPACE, ((substring, ...args) => {
			return '&nbsp;'.repeat(substring.length * 4);
		}))

        const pArray = text.trim().split(P_SEPARATOR);
        const end = pArray.length;
        let current = -1;
        while (++current < end) {
            pArray[current] = pArray[current].replace(BR_SEPARATOR, '<br>');
        }

        return ('<p>' + pArray.join('</p><p>') + '</p>')
    }).apply(this, arguments);
}
