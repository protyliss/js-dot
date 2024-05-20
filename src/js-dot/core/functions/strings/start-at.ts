export function startAt(value: string, searchString: string, ...moreSearchStrings: string[]): string {
    moreSearchStrings.unshift(searchString);

    const end = moreSearchStrings.length;
    let current = -1;
    while (++current < end) {
        const needle = moreSearchStrings[current];
        const indexOf = value.indexOf(needle);

        if (indexOf > -1) {
            value = value.slice(indexOf + needle.length);
        }
    }

    return value;
}
