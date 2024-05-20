import {renderParagraph} from './render-paragraph';

function render(text: string): number{
    const html = renderParagraph(text);
    console.log(html);
    return html.split('<p>').length - 1;
}

describe('renderParagraph', () => {
    test('Count 2', () => {
        expect(
            render([
                'First Line',
                'Second Line'
            ].join('\n\n'))
        )
            .toBe(2)
    });

    test('Count 3', () => {
        expect(
            render([
                'First Line',
                'Second Line',
                'Third Line'
            ].join('\n\n'))
        )
            .toBe(3)
    });

    test('Count 3 with Tap', () => {
        expect(
            render(`
                First Line
                First Line
                
                Second Line
                Second Line
                
                Third Line
           `)
        )
            .toBe(3)
    })

   test('Count 2 with Tap', () => {
       expect(
           render(`
                First Line
                
                Second Line
           `)
       )
           .toBe(2)
   });

    test('Count 3 with Tap', () => {
        expect(
            render(`
                First Line
                
                Second Line
                
                Third Line
           `)
        )
            .toBe(3)
    })
});
