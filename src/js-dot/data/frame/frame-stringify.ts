const {max:MAX} = Math;
export function frameStringify(frame: any[][]) {

    const sizes = [];

    frame.forEach(row => {
        row.forEach((cell, index) => {
            sizes[index] = MAX(sizes[index] || 3, ('' + cell).length);
        });
    });

    return frame.map(row => {
        return '|'+row.map((cell, index) => {
            return ('' + cell).padStart(sizes[index], ' ');
        })
            .join('|') + '|'
    })
        .join('\n');
}
