import {casting} from '@js-dot/core';

/**
 * The INI namespace object contains static methods for parsing values from and converting values to INI File
 *
 * @description
 * Supports:
 * - [x] parse
 * - [ ] stringify
 */
export abstract class INI {
    /**
     * The INI.parse() static method parses a INI string,
     *
     * @description
     * Supports:
     * - [x] sections
     * - [ ] section nesting
     * - [ ] disabled entry recognition
     * - [ ] multi-line support
     * - [x] value types
     *     : boolean
     *     : number
     *     : string
     * @param string
     */
    static parse<T = Record<string, any>>(string: string): T {
        const content = string.trim();
        const end = content.length;
        let current = -1;

        let stack = '';
        let key;
        const result = {};
        let section = result;
        const toEndOfLine = () => {
            let stack = '';
            while (++current < end) {
                const char = content.charAt(current);
                switch (char) {
                    case ';':
                    case '#':
                        toEndOfLine();
                        return stack;
                    case '\n':
                        if (content.charAt(current + 1) === '\r') {
                            current += 1;
                        }
                        return stack;
                    case '\r':
                        if (content.charAt(current + 1) === '\n') {
                            current += 1;
                        }
                        return stack;
                }
                stack += char;
            }
            return stack;
        }

        root: while (++current < end) {
            const char = content.charAt(current);

            switch (char) {
                case '\n':
                case '\r':
                    continue;

                case ';':
                case '#':
                    toEndOfLine();
                    continue;

                case '[':
                    let sectionString = '';
                    while (++current < end) {
                        const char = content.charAt(current);
                        if (char === ']') {
                            break;
                        }
                        sectionString += char;
                    }
                    result[sectionString] = {};

                    section = result[sectionString];

                    toEndOfLine();

                    continue;


                case '=':
                    key = stack.trim();
                    stack = '';

                    let value = toEndOfLine().trim();
                    let starts = value.charAt(0);
                    let ends = value.charAt(value.length - 1);
                    if ((starts === '"' && ends === '"')
                        || (starts === '"' && ends === '"')
                    ) {
                        value = value.substring(1, value.length - 1);
                    }

                    section[key] = casting(value);
                    continue;

            }

            stack += char;
        }

        return result as any as T;
    }
}

console.warn(
    JSON.stringify(
        INI.parse(`
[project]
name = orchard rental service (with app)
target region = "Bay Area"
; TODO: advertise vacant positions
legal team = (vacant)

[fruit "Apple"]
trademark issues = foreseeable
taste = known

[fruit.Date]
taste = novel
Trademark Issues="truly unlikely"
    `)
        , null, 2
    )
)