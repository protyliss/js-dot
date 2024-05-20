import {TemplateEngine, TemplateTagParser, TemplateTagToken} from './templates';

/**
 * #{} Parser
 */
export class SharpBraceParser extends TemplateTagParser {
    getToken(template: string) {
        const expressions: TemplateTagToken = [[], [], []];
        const [strings, keys, interpolations] = expressions;

        const end = template.length;
        let current = -1;
        let sharped = false;
        let opened = false;
        let string = '';
        let key = '';

        while (++current < end) {
            const char = template[current];

            switch (char) {
                case '#':
                    if (sharped) {
                        if (opened) {
                            opened = false;
                            string += '#{' + key;
                            key = '';
                        } else {
                            string += '#';
                        }
                        opened = false;
                        continue;
                    }
                    sharped = true;
                    continue;
                case '{':
                    if (sharped) {
                        if (opened) {
                            sharped = false;
                            opened = false;
                            string += '#{{' + key;
                            key = '';
                            continue;
                        }
                        opened = true;
                        continue
                    }
                    break;
                case '}':
                    if (sharped && opened) {
                        sharped = false;
                        opened = false;
                        const {length} = strings;
                        if (key && !length || string) {
                            strings[length] = string;
                            string = '';
                            keys[keys.length] = key;
                            interpolations[interpolations.length] = '#{' + key + '}';
                            key = '';
                        }
                        continue
                    }
            }

            if (opened) {
                key += char;
            } else {
                string += char;
            }
        }

        strings[strings.length] = string + (key ? '#{' + key : '')

        return expressions;
    }
}

/**
 * #{} Template
 */
export class SharpBraceTemplate extends TemplateEngine {
    constructor(
        template?: string
    ) {
        super(
            new SharpBraceParser(),
            null,
            template
        );
    }
}