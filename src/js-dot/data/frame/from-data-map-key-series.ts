interface FromMapInColumnMapOption<T extends Object = Record<string, any>> {
    labelHeader: string;
    labelIndex: keyof T;
    valueIndex: keyof T;
}

export function fromDataMapKeySeries<T extends Record<string, any>>(series: Record<string, T[]>, option?: Partial<FromMapInColumnMapOption<T>>) {
    const {labelIndex, valueIndex} = Object.assign(
        option || {},
        {
            labelHeader: 'date',
            labelIndex: 'date',
            valueIndex: 'value'
        }
    );


    const labels = Object.keys(series);
    const end = labels.length;
    let current = -1;

    const dataframe = [];
    const headers = labels;
    const rowIndexes = {};

    while (++current < end) {
        const key = labels[current];
        const list = series[key];

        const listEnd = list.length;
        let listCurrent = -1;

        while (++listCurrent < listEnd) {
            const item = list[listCurrent];

            const label = item[labelIndex];
            const value = item[valueIndex];

            let rowIndex = rowIndexes[label as string];
            if (rowIndex === undefined) {
                rowIndex = dataframe.length;
                rowIndexes[label as string] = rowIndex;
                dataframe[rowIndex] = [label];
            }

            let row = dataframe[rowIndex];

            let headerIndex = headers.indexOf(key);
            if (headerIndex < 0) {
                headerIndex = headers.length;
                headers[headerIndex] = key;
            }

            row[headerIndex + 1] = value
        }
    }

    headers.unshift(option.labelHeader);
    dataframe.unshift(headers);
    return dataframe;
}
