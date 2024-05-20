export function renderNonKr(value: string | number) {
    const _NON_KR = /[^가-힣]|\s/;
    const _TAG_START = /[a-z\/]/;

    // @ts-ignore
    return (renderNonKr = function (value) {
        if (value === undefined || value === null) {
            return value;
        }
        value = '' + value;
        const end = value.length;
        let current = -1;
        let result = '';
        let nonKr = '';

        function addNoneKr() {
            if (nonKr) {
                result += '<span class="non-kr">' + nonKr + '</span>';
                nonKr = '';
            }
        }

        root:
            while (++current < end) {
                let char = value.charAt(current);
                if (char === '<') {
                    if (_TAG_START.test(value.charAt(current + 1))) {
                        addNoneKr();

                        result += char;
                        while (++current < end) {
                            char = value.charAt(current);
                            result += char;
                            if (char === '>') {
                                continue root;
                            }
                        }
                    }
                }

                if (_NON_KR.test(char)) {
                    nonKr += char;
                } else {
                    addNoneKr();
                    result += char;
                }
            }
        addNoneKr();
        return result;
    }).apply(this, arguments);
}
