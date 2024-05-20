import {TemplateEngine, TemplateTagParser, TemplateTagToken} from './templates';

/**
 * {{}} Parser
 */
export class DoubleBraceTagParser extends TemplateTagParser {
	getToken(template: string) {
		const expressions: TemplateTagToken   = [[], [], []];
		const [strings, keys, interpolations] = expressions;

		const end   = template.length;
		let current = -1;
		let opened  = 0;
		let closed  = 0;
		let string  = '';
		let key     = '';

		while (++current < end) {
			const char = template[current];

			switch (char) {
				case '{':
					if (++opened > 2) {
						opened = 2;
						string += '{';
					}
					continue;
				case '}':
					closed++;

					if (opened === 2 && closed === 2) {
						opened                                = 0;
						closed                                = 0;
						strings[strings.length]               = string;
						string                                = '';
						keys[keys.length]                     = key;
						interpolations[interpolations.length] = '{{' + key + '}}';
						key                                   = '';
					}
					continue;
			}

			if (opened > 1) {
				key += char;
			} else {
				if (opened) {
					string += '{';
					opened = 0;
				}
				if (closed) {
					string += '}';
					closed = 0;
				}
				string += char;
			}
		}

		strings[strings.length] = string + (key ? '{{' + key : '')

		return expressions;
	}
}

/**
 * {{}} Template
 */
export class DoubleBraceTemplate extends TemplateEngine {
	constructor(template: string) {
		super(
			new DoubleBraceTagParser(),
			template
		);
	}
}
