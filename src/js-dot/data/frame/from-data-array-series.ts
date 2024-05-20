interface ArrayInArrayToFrameOption<T = any[]> {
    labelHeader: string;
    mergeIndex: number;
    keyIndex: number;
    valueIndex: number;
}

export function fromDataArraySeries<T extends (string | number)[]>(series: Array<T>, option?: Partial<ArrayInArrayToFrameOption<T>>) {

    const {labelIndex, keyIndex, valueIndex} = Object.assign(
        option || {},
        {
            labelHeader: 'date',
            labelIndex: 0,
            keyIndex: 1,
            valueIndex: 2
        }
    );


    const end = series.length;
    let current = -1;

    const dataframe = [];
    const rowIndexes = {};
    const headers = [];

    while (++current < end) {
        const timedValue = series[current];
        const label = timedValue[labelIndex];
        const key = timedValue[keyIndex];
        const value = timedValue[valueIndex];

        let rowIndex = rowIndexes[label];
        if(rowIndex === undefined){
            rowIndex = dataframe.length;
            rowIndexes[label] = rowIndex;
            dataframe[rowIndex] = [label];
        }

        let row = dataframe[rowIndex];

        let headerIndex = headers.indexOf(key);
        if (headerIndex < 0) {
            headerIndex = headers.length;
            headers[headerIndex] = key;
        }

        row[headerIndex+1] = value
    }

    headers.unshift(option.labelHeader);
    dataframe.unshift(headers);

    return dataframe;
}
