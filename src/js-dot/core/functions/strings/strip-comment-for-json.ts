/**
 * Remove Comment in Json
 *
 * @description
 * Does not support Script
 * There are too many cases to consider.
 *
 * @param value
 */
export function stripCommentForJson(value: string) {
    const end = value.length;
    let index = -1;
    let result = '';
    loop:
        while (++index < end) {
            const char = value[index];
            switch (char) {
                case '"':
                    result += char;
                    while (++index < end) {
                        const next = value[index];
                        result += next;
                        if (next === '"') {
                            break;
                        }
                    }
                    continue;
                case '/':
                    const next = value[index + 1];
                    switch (next) {
                        case '*':
                            result = result.trimEnd();
                            index++;
                            while (++index < end) {
                                if (value[index] === '*' && value[index + 1] === '/') {
                                    index += 1;
                                    continue loop;
                                }
                            }
                            continue;
                        case '/':
                            result = result.trimEnd();
                            while (++index < end) {
                                const after = value[index];
                                switch (after) {
                                    case '\n':
                                    case '\r':
                                        result += after;
                                        continue loop;
                                }
                            }
                            continue;
                    }
            }

            result += char;
        }

    return result;
}